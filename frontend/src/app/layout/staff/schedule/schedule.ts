export class StaffSchedule {
    staffId: number;
    staffName: string;
    shiftStart1: string;
    shiftEnd1: string;
    shiftStart2: string;
    shiftEnd2: string;
    repeatWeekly: boolean;

    shiftStartDate: "";
    shiftEndDate: "";
    repeatEnd: "";
    weeklyHours: number;

    weekSchedule = [];
  
    constructor() {
        this.staffName = 'Giang';
        this.weeklyHours = 48;
        this.repeatWeekly = false;
        this.getWeekSchedule();
    }

    toDto() {
        return {
            id_staff: this.staffId,
            shift1_start: this.shiftStart1,
            shift1_end: this.shiftEnd1,
            shift2_start: this.shiftStart2,
            shift2_end: this.shiftEnd2,
            is_repeat: this.staffId,
            repeat_weekly: this.staffId,
        }
    }

    getWeekSchedule() {
        let sche = [];
        for (let i = 0; i < 7; i++) {
            let lul;
            if (i%2 === 0) {
                lul = {
                    start: "9:00",
                    end: "17:00",
                }
            } else {
                lul = null;
            }
            sche.push(lul);
        }

        this.weekSchedule = sche;
    }
}