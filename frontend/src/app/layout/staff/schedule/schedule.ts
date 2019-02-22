import { NgbTimeStruct } from "@ng-bootstrap/ng-bootstrap";

export class StaffSchedule {
    staffId: number;
    staffName: string;
    weeklyHours: number;

    weekSchedule: Schedule[];
    allSchedules: Schedule[];
  
    constructor() {
        this.staffName = 'Giang';
        this.weeklyHours = 48;
    }

    findFutureConflicts(schedule: Schedule) {
        return this.allSchedules.filter(s => {
            let isScheduleOnTheSameDay = s.scheduleStartDate.getDay() === schedule.scheduleStartDate.getDay();
            let isFuture = s.scheduleStartDate.getTime() > schedule.scheduleStartDate.getTime();
            if (isScheduleOnTheSameDay && isFuture) {
                return s;
            }
        });
    }

    // for showing current week's working hours
    getWeekSchedule(weekRange) {
        let startWeek = weekRange[0].date.getTime();
        let endWeek = weekRange[6].date.getTime();

        let filtered = this.allSchedules.filter(s => {
            let shiftStart = s.scheduleStartDate.getTime();
            let shiftEnd = s.scheduleEndDate.getTime();
            let cond1 = startWeek <= shiftStart && shiftStart <= endWeek;
            let cond2 = shiftStart < endWeek && (shiftEnd >= startWeek || s.scheduleEndDate == null);
            return cond1 || cond2;
        });

        let totalWeeklyHours = 0;

        this.weekSchedule = weekRange.map(d => {
            let currentDateString = d.date.toDateString();
            let found = filtered.filter(s => s.scheduleStartDate.getDay === d.date.getDay())[0];

            if (found) {
                found.currentDate = currentDateString;
                found.currentDay = d.date.toLocaleDateString('en-US', {weekday: 'short'});;
                totalWeeklyHours += found.getTotalHours();
                return found;
            }
            return new Schedule(this.staffId, this.staffName, currentDateString);
        });
        this.weeklyHours = totalWeeklyHours;

    }
}

export class Schedule {
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
    
    currentDate: string;
    currentDay: string;
    breakTime: NgbTimeStruct;
    isNew: boolean;

    constructor(staffId, staffName, currentDate?) {
        this.staffId = staffId;
        this.staffName = staffName;
        this.shiftStart1 = {hour: 0, minute: 0, second: 0};
        this.shiftEnd1 = {hour: 0, minute: 0, second: 0};
        this.shiftStart2 = {hour: 0, minute: 0, second: 0};
        this.shiftEnd2 = {hour: 0, minute: 0, second: 0};
        this.isRepeat = false;
        this.currentDate = currentDate;
        
        this.breakTime = {hour: 0, minute: 0, second: 0};;
        this.isNew = true;
        this.hasShift2 = false;
    }
    
    getTotalHours() {
        return this.shiftEnd2.hour - this.shiftStart1.hour + this.shiftEnd2.hour - this.shiftStart2.hour;
    }

    toggleShift2() {
        this.hasShift2 = !this.hasShift2;
    }

    updateBreakTime() {
        this.breakTime = {hour: this.shiftStart2.hour - this.shiftEnd1.hour, minute: this.shiftStart2.minute - this.shiftEnd1.minute, second: 0}
    }

    updateData(data) {
        this.isNew = false;
        this.hasShift2 = data.has_shift_2;
        this.shiftStart1 = data.shift1_start;
        this.shiftEnd1 = data.shift1_end;
        this.shiftStart2 = data.shift2_start;
        this.shiftEnd2 = data.shift2_end;
        this.scheduleStartDate = new Date(data.shift_start_date);
        this.scheduleEndDate = new Date(data.shift_end_date);
        this.isRepeat =  data.is_repeat === 1 ? true : false;
        if (this.hasShift2) {
            this.updateBreakTime();
        }
    }

    toDto() {
        return {
            id_staff: this.staffId,
            shift1_start: this.shiftStart1,
            shift1_end: this.shiftEnd1,
            shift2_start: this.shiftStart2,
            shift2_end: this.shiftEnd2,
            is_repeat: this.isRepeat ? 1 : 0,
            has_shift_2: this.hasShift2 ? 1 : 0,
            sche_start: this.scheduleStartDate,
            end_repeat: this.scheduleEndDate,
        }
    }
}