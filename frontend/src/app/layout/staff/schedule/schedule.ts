import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
declare var Date: any;

export class StaffSchedule {
    staffId: number;
    staffName: string;
    weeklyHours: number;

    weekSchedule: Schedule[];
    allSchedules: Schedule[];

    conflictedSchedules: Schedule[];

    constructor() {
        this.staffName = 'Giang';
        this.weeklyHours = 48;
        this.conflictedSchedules = [];
    }

    findFutureConflicts(schedule: Schedule) {
        this.conflictedSchedules = this.allSchedules.filter(s => {
            const isScheduleOnTheSameDay = s.scheduleStartDate.getDay() === schedule.scheduleStartDate.getDay();
            const isFuture = s.scheduleStartDate.getTime() > schedule.scheduleStartDate.getTime();
            if (isScheduleOnTheSameDay && isFuture) {
                return s;
            }
        });
    }

    // for showing current week's working hours
    getWeekSchedule(weekRange) {
        const startWeek = weekRange[0].date.setHours(0, 0, 0, 0);
        const endWeek = weekRange[6].date.setHours(0, 0, 0, 0);

        const filtered = this.allSchedules.filter(s => {
            const scheduleStart = s.scheduleStartDate.getTime();
            const scheduleEnd = s.hasEndDate == 1 ? s.scheduleEndDate.getTime() : null;
            const scheduleStartInRange = startWeek <= scheduleStart && scheduleStart <= endWeek;
            const scheduleEndInOrAfterRange = s.isRepeat
            && scheduleStart < startWeek
            && (scheduleEnd >= startWeek || s.scheduleEndDate == null);

            return scheduleStartInRange || scheduleEndInOrAfterRange;
        });

        let totalWeeklyHours = 0;

        this.weekSchedule = weekRange.map(d => {
            const found = filtered
            .filter(s => s.scheduleStartDate.getDay() === d.date.getDay())
            .sort((a, b) => b.scheduleStartDate.getTime() - a.scheduleStartDate.getTime())
            [0];

            if (found) {
                found.setCurrentDate(d.date);
                totalWeeklyHours += found.getTotalHoursOfTheDay();
                return found;
            }
            return new Schedule(this.staffId, this.staffName, d.date);
        });
        this.weeklyHours = totalWeeklyHours;

    }
}

export class Schedule {
    id: number;
    staffId: number;
    staffName: string;
    shiftStart1: NgbTimeStruct;
    shiftEnd1: NgbTimeStruct;
    shiftStart2: NgbTimeStruct;
    shiftEnd2: NgbTimeStruct;
    isRepeat: boolean;

    scheduleStartDate: Date;
    scheduleEndDate: Date;
    hasShift2: boolean;
    hasEndDate: number;
    isValidShift: boolean;


    currentDate: Date;
    breakTime: NgbTimeStruct;

    backupStartDate;

    /**
     * determine if the schedule is new or not
     */
    isNew: boolean;

    constructor(staffId, staffName, currentDate?: Date) {
        this.staffId = staffId;
        this.staffName = staffName;
        this.shiftStart1 = {hour: 9, minute: 0, second: 0};
        this.shiftEnd1 = {hour: 17, minute: 0, second: 0};
        this.shiftStart2 = {hour: 18, minute: 0, second: 0};
        this.shiftEnd2 = {hour: 22, minute: 0, second: 0};
        this.isRepeat = false;

        this.currentDate = currentDate;
        this.scheduleStartDate = currentDate; // when create new schedule

        this.breakTime = {hour: 0, minute: 0, second: 0};
        this.isNew = true;
        this.hasShift2 = false;
        this.isValidShift = true;
        this.hasEndDate = 0;
    }

    clone() { // not cloning function, unusable
        const cloned = Object.assign({}, this);
        cloned.scheduleEndDate = cloned.scheduleEndDate ? new Date(cloned.scheduleEndDate.getTime()) : null;
        cloned.scheduleStartDate = new Date(cloned.scheduleStartDate.getTime());
        cloned.currentDate = new Date(cloned.currentDate.getTime());

        return cloned;
    }

    setToNoRepeat() {
        this.isRepeat = false;
        this.hasEndDate = 0;
        this.scheduleEndDate = null;
    }

    setStartScheduleToNextWeek() {
        this.setStartScheduleToToday();
        this.scheduleStartDate.setDate(this.scheduleStartDate.getDate() + 7);
    }

    setStartScheduleToToday() {
        this.backupStartDate =  new Date(this.scheduleStartDate);
        this.scheduleStartDate = new Date(this.currentDate);
    }

    resetStartDate() {
        this.scheduleStartDate = new Date(this.backupStartDate);
    }

    setEndScheduleToPreviousWeek() {
        this.hasEndDate = 1;
        this.scheduleEndDate = new Date(this.currentDate);
        this.scheduleEndDate.setDate(this.currentDate.getDate() - 7);
    }

    isScheduleStartOnCurrentDate() {
        return this.scheduleStartDate.setHours(0, 0, 0, 0) === this.currentDate.setHours(0, 0, 0, 0);
    }

    setCurrentDate(currentDate: Date) {
        this.currentDate = currentDate;
    }

    getTotalHoursOfTheDay() {
        return this.shiftEnd1.hour - this.shiftStart1.hour
        + (this.hasShift2 ? this.shiftEnd2.hour - this.shiftStart2.hour : 0);
    }

    toggleShift2() {
        this.hasShift2 = !this.hasShift2;
    }

    validateShift() {
        const validShift1 = this.shiftEnd1.hour - this.shiftStart1.hour > 0 ;
        const validShift2 = this.hasShift2 ? (this.shiftEnd2.hour - this.shiftStart2.hour > 0 ? true : false) : true;
        this.isValidShift = validShift1 && validShift2;
        this.updateBreakTime();
    }

    updateBreakTime() {
        if (this.hasShift2) {
            this.breakTime = {hour: this.shiftStart2.hour - this.shiftEnd1.hour, minute: this.shiftStart2.minute - this.shiftEnd1.minute, second: 0};
            this.isValidShift =  this.isValidShift && this.breakTime.hour > 0 ? true : false;
        }
    }

    updateData(data) {
        this.id = data.id;
        this.staffId = data.id_staff;
        this.isNew = false;
        this.hasShift2 = data.has_shift_2 === 1 ? true : false;
        this.hasEndDate = data.has_end_date == null ? 0 : data.has_end_date; // set default = 0 (onGoing)
        this.shiftStart1 = JSON.parse(data.shift1_start);
        this.shiftEnd1 = JSON.parse(data.shift1_end);
        this.shiftStart2 = JSON.parse(data.shift2_start);
        this.shiftEnd2 = JSON.parse(data.shift2_end);
        this.scheduleStartDate = new Date(data.schedule_start);
        this.scheduleEndDate = data.schedule_end ? new Date(data.schedule_end) : null;
        this.isRepeat =  data.is_repeat === 1 ? true : false;
        if (this.hasShift2) {
            this.updateBreakTime();
        }
    }

    toDto() {
        const options = {month: 'numeric', day: 'numeric', year: 'numeric' };
        return {
            id: this.id,
            id_staff: this.staffId,
            shift1_start: JSON.stringify(this.shiftStart1),
            shift1_end: JSON.stringify(this.shiftEnd1),
            shift2_start: JSON.stringify(this.shiftStart2),
            shift2_end: JSON.stringify(this.shiftEnd2),
            is_repeat: this.isRepeat ? 1 : 0,
            has_shift_2: this.hasShift2 ? 1 : 0,
            has_end_date: this.hasEndDate,
            schedule_start: this.scheduleStartDate.toLocaleDateString('en-US', options),
            schedule_end: this.hasEndDate == 1 ? this.scheduleEndDate.toLocaleDateString('en-US', options) : null,
        };
    }
}
