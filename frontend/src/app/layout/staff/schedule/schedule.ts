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