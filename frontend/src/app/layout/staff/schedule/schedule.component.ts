import { Component, OnInit } from '@angular/core';
import { StaffSchedule, Schedule } from './schedule';
import { NgbModal, NgbModalRef, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { StaffService } from '../staff.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  providers: [
    { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter },
  ]
})
export class ScheduleComponent implements OnInit {
  weekdays: any[];
  closedDates: any[];
  today: Date;
  schedules: StaffSchedule[];
  allSchedules: StaffSchedule[];
  selectedSchedule: Schedule;

  currentWeekModel: NgbDateStruct;
  staffFilter: number;
  selectedStaff: StaffSchedule;

  isConfirmDeleteRepeat: boolean;

  times: any[];

  isDisabled = (date: NgbDateStruct, current: {month: number}) => {
    const day = new Date(date.year, date.month - 1, date.day).getDay();
    return this.selectedSchedule.currentDate.getDay() != day;
}

  constructor(
    private modal: NgbModal,
    private notifierService: NotifierService,
    private staffService: StaffService,
  ) {
    this.today = new Date();
    this.weekdays = [];
    this.staffFilter = 0; // show all staff
    this.currentWeekModel = { day: 1, month: 1, year: 2019 };
    this.schedules = [];
    this.times = [
      {text:'1:00am', hour: 1, minute: 0},
      {text:'1:05am', hour: 1, minute: 5},
      {text:'1:10am', hour: 1, minute: 10},
      {text:'1:15am', hour: 1, minute: 15},
      {text:'1:20am', hour: 1, minute: 20},
      {text:'1:25am', hour: 1, minute: 25},
      {text:'1:30am', hour: 1, minute: 30},
      {text:'1:35am', hour: 1, minute: 35},
      {text:'1:40am', hour: 1, minute: 40},
      {text:'1:45am', hour: 1, minute: 45},
      {text:'1:50am', hour: 1, minute: 50},
      {text:'1:55am', hour: 1, minute: 55},
      {text:'2:00am', hour: 2, minute: 0},
      {text:'2:05am', hour: 2, minute: 5},
      {text:'2:10am', hour: 2, minute: 10},
      {text:'2:15am', hour: 2, minute: 15},
      {text:'2:20am', hour: 2, minute: 20},
      {text:'2:25am', hour: 2, minute: 25},
      {text:'2:30am', hour: 2, minute: 30},
      {text:'2:35am', hour: 2, minute: 35},
      {text:'2:40am', hour: 2, minute: 40},
      {text:'2:45am', hour: 2, minute: 45},
      {text:'2:50am', hour: 2, minute: 50},
      {text:'2:55am', hour: 2, minute: 55},
      {text:'3:00am', hour: 3, minute: 0},
      {text:'3:05am', hour: 3, minute: 5},
      {text:'3:10am', hour: 3, minute: 10},
      {text:'3:15am', hour: 3, minute: 15},
      {text:'3:20am', hour: 3, minute: 20},
      {text:'3:25am', hour: 3, minute: 25},
      {text:'3:30am', hour: 3, minute: 30},
      {text:'3:35am', hour: 3, minute: 35},
      {text:'3:40am', hour: 3, minute: 40},
      {text:'3:45am', hour: 3, minute: 45},
      {text:'3:50am', hour: 3, minute: 50},
      {text:'3:55am', hour: 3, minute: 55},
      {text:'4:00am', hour: 4, minute: 0},
      {text:'4:05am', hour: 4, minute: 5},
      {text:'4:10am', hour: 4, minute: 10},
      {text:'4:15am', hour: 4, minute: 15},
      {text:'4:20am', hour: 4, minute: 20},
      {text:'4:25am', hour: 4, minute: 25},
      {text:'4:30am', hour: 4, minute: 30},
      {text:'4:35am', hour: 4, minute: 35},
      {text:'4:40am', hour: 4, minute: 40},
      {text:'4:45am', hour: 4, minute: 45},
      {text:'4:50am', hour: 4, minute: 50},
      {text:'4:55am', hour: 4, minute: 55},
      {text:'5:00am', hour: 5, minute: 0},
      {text:'5:05am', hour: 5, minute: 5},
      {text:'5:10am', hour: 5, minute: 10},
      {text:'5:15am', hour: 5, minute: 15},
      {text:'5:20am', hour: 5, minute: 20},
      {text:'5:25am', hour: 5, minute: 25},
      {text:'5:30am', hour: 5, minute: 30},
      {text:'5:35am', hour: 5, minute: 35},
      {text:'5:40am', hour: 5, minute: 40},
      {text:'5:45am', hour: 5, minute: 45},
      {text:'5:50am', hour: 5, minute: 50},
      {text:'5:55am', hour: 5, minute: 55},
      {text:'6:00am', hour: 6, minute: 0},
      {text:'6:05am', hour: 6, minute: 5},
      {text:'6:10am', hour: 6, minute: 10},
      {text:'6:15am', hour: 6, minute: 15},
      {text:'6:20am', hour: 6, minute: 20},
      {text:'6:25am', hour: 6, minute: 25},
      {text:'6:30am', hour: 6, minute: 30},
      {text:'6:35am', hour: 6, minute: 35},
      {text:'6:40am', hour: 6, minute: 40},
      {text:'6:45am', hour: 6, minute: 45},
      {text:'6:50am', hour: 6, minute: 50},
      {text:'6:55am', hour: 6, minute: 55},
      {text:'7:00am', hour: 7, minute: 0},
      {text:'7:05am', hour: 7, minute: 5},
      {text:'7:10am', hour: 7, minute: 10},
      {text:'7:15am', hour: 7, minute: 15},
      {text:'7:20am', hour: 7, minute: 20},
      {text:'7:25am', hour: 7, minute: 25},
      {text:'7:30am', hour: 7, minute: 30},
      {text:'7:35am', hour: 7, minute: 35},
      {text:'7:40am', hour: 7, minute: 40},
      {text:'7:45am', hour: 7, minute: 45},
      {text:'7:50am', hour: 7, minute: 50},
      {text:'7:55am', hour: 7, minute: 55},
      {text:'8:00am', hour: 8, minute: 0},
      {text:'8:05am', hour: 8, minute: 5},
      {text:'8:10am', hour: 8, minute: 10},
      {text:'8:15am', hour: 8, minute: 15},
      {text:'8:20am', hour: 8, minute: 20},
      {text:'8:25am', hour: 8, minute: 25},
      {text:'8:30am', hour: 8, minute: 30},
      {text:'8:35am', hour: 8, minute: 35},
      {text:'8:40am', hour: 8, minute: 40},
      {text:'8:45am', hour: 8, minute: 45},
      {text:'8:50am', hour: 8, minute: 50},
      {text:'8:55am', hour: 8, minute: 55},
      {text:'9:00am', hour: 9, minute: 0},
      {text:'9:05am', hour: 9, minute: 5},
      {text:'9:10am', hour: 9, minute: 10},
      {text:'9:15am', hour: 9, minute: 15},
      {text:'9:20am', hour: 9, minute: 20},
      {text:'9:25am', hour: 9, minute: 25},
      {text:'9:30am', hour: 9, minute: 30},
      {text:'9:35am', hour: 9, minute: 35},
      {text:'9:40am', hour: 9, minute: 40},
      {text:'9:45am', hour: 9, minute: 45},
      {text:'9:50am', hour: 9, minute: 50},
      {text:'9:55am', hour: 9, minute: 55},
      {text:'10:00am', hour: 10, minute: 0},
      {text:'10:05am', hour: 10, minute: 5},
      {text:'10:10am', hour: 10, minute: 10},
      {text:'10:15am', hour: 10, minute: 15},
      {text:'10:20am', hour: 10, minute: 20},
      {text:'10:25am', hour: 10, minute: 25},
      {text:'10:30am', hour: 10, minute: 30},
      {text:'10:35am', hour: 10, minute: 35},
      {text:'10:40am', hour: 10, minute: 40},
      {text:'10:45am', hour: 10, minute: 45},
      {text:'10:50am', hour: 10, minute: 50},
      {text:'10:55am', hour: 10, minute: 55},
      {text:'11:00am', hour: 11, minute: 0},
      {text:'11:05am', hour: 11, minute: 5},
      {text:'11:10am', hour: 11, minute: 10},
      {text:'11:15am', hour: 11, minute: 15},
      {text:'11:20am', hour: 11, minute: 20},
      {text:'11:25am', hour: 11, minute: 25},
      {text:'11:30am', hour: 11, minute: 30},
      {text:'11:35am', hour: 11, minute: 35},
      {text:'11:40am', hour: 11, minute: 40},
      {text:'11:45am', hour: 11, minute: 45},
      {text:'11:50am', hour: 11, minute: 50},
      {text:'11:55am', hour: 11, minute: 55},
      {text:'12:00am', hour: 12, minute: 0},
      {text:'12:05am', hour: 12, minute: 5},
      {text:'12:10am', hour: 12, minute: 10},
      {text:'12:15am', hour: 12, minute: 15},
      {text:'12:20am', hour: 12, minute: 20},
      {text:'12:25am', hour: 12, minute: 25},
      {text:'12:30am', hour: 12, minute: 30},
      {text:'12:35am', hour: 12, minute: 35},
      {text:'12:40am', hour: 12, minute: 40},
      {text:'12:45am', hour: 12, minute: 45},
      {text:'12:50am', hour: 12, minute: 50},
      {text:'12:55am', hour: 12, minute: 55},
      {text:'1:00pm', hour: 13, minute: 0},
      {text:'1:05pm', hour: 13, minute: 5},
      {text:'1:10pm', hour: 13, minute: 10},
      {text:'1:15pm', hour: 13, minute: 15},
      {text:'1:20pm', hour: 13, minute: 20},
      {text:'1:25pm', hour: 13, minute: 25},
      {text:'1:30pm', hour: 13, minute: 30},
      {text:'1:35pm', hour: 13, minute: 35},
      {text:'1:40pm', hour: 13, minute: 40},
      {text:'1:45pm', hour: 13, minute: 45},
      {text:'1:50pm', hour: 13, minute: 50},
      {text:'1:55pm', hour: 13, minute: 55},
      {text:'2:00pm', hour: 14, minute: 0},
      {text:'2:05pm', hour: 14, minute: 5},
      {text:'2:10pm', hour: 14, minute: 10},
      {text:'2:15pm', hour: 14, minute: 15},
      {text:'2:20pm', hour: 14, minute: 20},
      {text:'2:25pm', hour: 14, minute: 25},
      {text:'2:30pm', hour: 14, minute: 30},
      {text:'2:35pm', hour: 14, minute: 35},
      {text:'2:40pm', hour: 14, minute: 40},
      {text:'2:45pm', hour: 14, minute: 45},
      {text:'2:50pm', hour: 14, minute: 50},
      {text:'2:55pm', hour: 14, minute: 55},
      {text:'3:00pm', hour: 15, minute: 0},
      {text:'3:05pm', hour: 15, minute: 5},
      {text:'3:10pm', hour: 15, minute: 10},
      {text:'3:15pm', hour: 15, minute: 15},
      {text:'3:20pm', hour: 15, minute: 20},
      {text:'3:25pm', hour: 15, minute: 25},
      {text:'3:30pm', hour: 15, minute: 30},
      {text:'3:35pm', hour: 15, minute: 35},
      {text:'3:40pm', hour: 15, minute: 40},
      {text:'3:45pm', hour: 15, minute: 45},
      {text:'3:50pm', hour: 15, minute: 50},
      {text:'3:55pm', hour: 15, minute: 55},
      {text:'4:00pm', hour: 16, minute: 0},
      {text:'4:05pm', hour: 16, minute: 5},
      {text:'4:10pm', hour: 16, minute: 10},
      {text:'4:15pm', hour: 16, minute: 15},
      {text:'4:20pm', hour: 16, minute: 20},
      {text:'4:25pm', hour: 16, minute: 25},
      {text:'4:30pm', hour: 16, minute: 30},
      {text:'4:35pm', hour: 16, minute: 35},
      {text:'4:40pm', hour: 16, minute: 40},
      {text:'4:45pm', hour: 16, minute: 45},
      {text:'4:50pm', hour: 16, minute: 50},
      {text:'4:55pm', hour: 16, minute: 55},
      {text:'5:00pm', hour: 17, minute: 0},
      {text:'5:05pm', hour: 17, minute: 5},
      {text:'5:10pm', hour: 17, minute: 10},
      {text:'5:15pm', hour: 17, minute: 15},
      {text:'5:20pm', hour: 17, minute: 20},
      {text:'5:25pm', hour: 17, minute: 25},
      {text:'5:30pm', hour: 17, minute: 30},
      {text:'5:35pm', hour: 17, minute: 35},
      {text:'5:40pm', hour: 17, minute: 40},
      {text:'5:45pm', hour: 17, minute: 45},
      {text:'5:50pm', hour: 17, minute: 50},
      {text:'5:55pm', hour: 17, minute: 55},
      {text:'6:00pm', hour: 18, minute: 0},
      {text:'6:05pm', hour: 18, minute: 5},
      {text:'6:10pm', hour: 18, minute: 10},
      {text:'6:15pm', hour: 18, minute: 15},
      {text:'6:20pm', hour: 18, minute: 20},
      {text:'6:25pm', hour: 18, minute: 25},
      {text:'6:30pm', hour: 18, minute: 30},
      {text:'6:35pm', hour: 18, minute: 35},
      {text:'6:40pm', hour: 18, minute: 40},
      {text:'6:45pm', hour: 18, minute: 45},
      {text:'6:50pm', hour: 18, minute: 50},
      {text:'6:55pm', hour: 18, minute: 55},
      {text:'7:00pm', hour: 19, minute: 0},
      {text:'7:05pm', hour: 19, minute: 5},
      {text:'7:10pm', hour: 19, minute: 10},
      {text:'7:15pm', hour: 19, minute: 15},
      {text:'7:20pm', hour: 19, minute: 20},
      {text:'7:25pm', hour: 19, minute: 25},
      {text:'7:30pm', hour: 19, minute: 30},
      {text:'7:35pm', hour: 19, minute: 35},
      {text:'7:40pm', hour: 19, minute: 40},
      {text:'7:45pm', hour: 19, minute: 45},
      {text:'7:50pm', hour: 19, minute: 50},
      {text:'7:55pm', hour: 19, minute: 55},
      {text:'8:00pm', hour: 20, minute: 0},
      {text:'8:05pm', hour: 20, minute: 5},
      {text:'8:10pm', hour: 20, minute: 10},
      {text:'8:15pm', hour: 20, minute: 15},
      {text:'8:20pm', hour: 20, minute: 20},
      {text:'8:25pm', hour: 20, minute: 25},
      {text:'8:30pm', hour: 20, minute: 30},
      {text:'8:35pm', hour: 20, minute: 35},
      {text:'8:40pm', hour: 20, minute: 40},
      {text:'8:45pm', hour: 20, minute: 45},
      {text:'8:50pm', hour: 20, minute: 50},
      {text:'8:55pm', hour: 20, minute: 55},
      {text:'9:00pm', hour: 21, minute: 0},
      {text:'9:05pm', hour: 21, minute: 5},
      {text:'9:10pm', hour: 21, minute: 10},
      {text:'9:15pm', hour: 21, minute: 15},
      {text:'9:20pm', hour: 21, minute: 20},
      {text:'9:25pm', hour: 21, minute: 25},
      {text:'9:30pm', hour: 21, minute: 30},
      {text:'9:35pm', hour: 21, minute: 35},
      {text:'9:40pm', hour: 21, minute: 40},
      {text:'9:45pm', hour: 21, minute: 45},
      {text:'9:50pm', hour: 21, minute: 50},
      {text:'9:55pm', hour: 21, minute: 55},
      {text:'10:00pm', hour: 22, minute: 0},
      {text:'10:05pm', hour: 22, minute: 5},
      {text:'10:10pm', hour: 22, minute: 10},
      {text:'10:15pm', hour: 22, minute: 15},
      {text:'10:20pm', hour: 22, minute: 20},
      {text:'10:25pm', hour: 22, minute: 25},
      {text:'10:30pm', hour: 22, minute: 30},
      {text:'10:35pm', hour: 22, minute: 35},
      {text:'10:40pm', hour: 22, minute: 40},
      {text:'10:45pm', hour: 22, minute: 45},
      {text:'10:50pm', hour: 22, minute: 50},
      {text:'10:55pm', hour: 22, minute: 55},
      {text:'11:00pm', hour: 23, minute: 0},
      {text:'11:05pm', hour: 23, minute: 5},
      {text:'11:10pm', hour: 23, minute: 10},
      {text:'11:15pm', hour: 23, minute: 15},
      {text:'11:20pm', hour: 23, minute: 20},
      {text:'11:25pm', hour: 23, minute: 25},
      {text:'11:30pm', hour: 23, minute: 30},
      {text:'11:35pm', hour: 23, minute: 35},
      {text:'11:40pm', hour: 23, minute: 40},
      {text:'11:45pm', hour: 23, minute: 45},
      {text:'11:50pm', hour: 23, minute: 50},
      {text:'11:55pm', hour: 23, minute: 55},
    ];
  }

  ngOnInit() {
    this.staffService.getListClosedDate().subscribe((dates: any[]) => {
      this.closedDates = dates;
      this.changeWeek();
    });
  }

  openModal(content: NgbModalRef) {
    this.modal.open(content, {
      backdrop: 'static',
      size: 'md'
    });
  }

  openScheduleModal(content: NgbModalRef, schedule: Schedule) {
    this.selectedStaff = this.schedules.filter(s => s.staffId === schedule.staffId)[0];
    this.selectedSchedule = schedule;
    this.openModal(content);
  }

  changeStaff(staffId) {
    staffId = parseInt(staffId, 10);
    if (staffId === 0) { // show all staff
      this.schedules = this.allSchedules;
    } else {
      this.schedules = this.allSchedules.filter(s => s.staffId === staffId);
    }
  }

  onClickDeleteSchedule(confirm_override) {
    if (!this.selectedSchedule.isValidShift) {
      return;
    }

    this.isConfirmDeleteRepeat = true;

    if (this.selectedSchedule.isRepeat) {
      this.openModal(confirm_override);
    } else {
      this.deleteSchedule();
    }
  }

  onClickDeleteUpcoming() {
    if (this.selectedSchedule.isScheduleStartOnCurrentDate()) {
      this.deleteSchedule();
    } else {
      this.selectedSchedule.setEndScheduleToPreviousWeek();
      this.updateSchedule();
    }
  }

  onClickDeleteThisShiftOnly() {
    if (this.selectedSchedule.isScheduleStartOnCurrentDate()) {
      this.selectedSchedule.setStartScheduleToNextWeek();
      this.addSchedule();
      return;
    }

    this.selectedSchedule.setStartScheduleToNextWeek();
    let add = this.addSchedule(this.selectedSchedule.toDto());

    this.selectedSchedule.resetStartDate();
    this.selectedSchedule.setEndScheduleToPreviousWeek();
    let update = this.updateSchedule(this.selectedSchedule.toDto());

    forkJoin([add, update]).subscribe(v => {
      this.loadData();
      this.modal.dismissAll();
      this.notifierService.notify('success', 'The schedule has been successfully deleted');
    });
  }

  overrideUpcoming(): any[] {
    return this.selectedStaff.conflictedSchedules.map(c => this.deleteSchedule(c.id));
  }

  onClickUpdateUpcoming(): void {
    let f;
    if (this.selectedSchedule.isNew) { // new schedule
      f = this.addSchedule(this.selectedSchedule.toDto());
    } else {
      f = this.updateSchedule(this.selectedSchedule.toDto());
    }

    forkJoin([f, ...this.overrideUpcoming()]).subscribe(v => {
      this.loadData();
      this.modal.dismissAll();
      this.notifierService.notify('success', 'The schedule has been successfully updated');
    });


  }

  onClickUpdateThisShiftOnly(): any {
    this.selectedSchedule.setStartScheduleToToday();
    this.selectedSchedule.setToNoRepeat();
    this.addSchedule();
  }

  onClickSaveSchedule(confirmOverrideModal): any {
    this.isConfirmDeleteRepeat = false;

    if (this.selectedSchedule.isRepeat) {
      if (this.selectedSchedule.isNew) {
        this.selectedStaff.findFutureConflicts(this.selectedSchedule);
        if (this.selectedStaff.conflictedSchedules.length > 0) {// has future conflict
          this.openModal(confirmOverrideModal);
          return;
        }
      } else { // update mode
        this.openModal(confirmOverrideModal);
        return;
      }
    }

    // no repeat / no conflict.
    if (this.selectedSchedule.isNew) {
      this.addSchedule();
    } else {
      this.updateSchedule();
    }
    this.modal.dismissAll();
  }

  addSchedule(dto?): any {
    if (dto) {
      return this.staffService.addSchedule(dto);
    }

    this.staffService.addSchedule(this.selectedSchedule.toDto()).subscribe(v => {
      this.loadData();
      this.modal.dismissAll();
      this.notifierService.notify('success', 'A new schedule has been successfully added');
    });
  }

  updateSchedule(dto?): any {
    if (dto) {
      return this.staffService.updateSchedule(dto);
    }

    this.staffService.updateSchedule(this.selectedSchedule.toDto()).subscribe(v => {
      this.loadData();
      this.modal.dismissAll();
      this.notifierService.notify('success', 'The schedule has been successfully updated');
    });
  }

  deleteSchedule(id?): any {
    if (id) {
      return this.staffService.deleteScheduleById(id);
    }

    this.staffService.deleteScheduleById(this.selectedSchedule.id).subscribe(v => {
      this.modal.dismissAll();
      this.loadData();
    });
  }

  loadData(text?): void {
    const schedules = this.staffService.getListSchedule();
    const staffs = this.staffService.getList();

    forkJoin([schedules, staffs]).subscribe((rs: any) => {
      this.allSchedules = this.mapStaffsAndSchedules(rs[1].user, rs[0].workinghour);

      this.changeStaff(this.staffFilter);

      // fix bug khoi dong ko hien date.
      if (text) {
        const weekPicker = document.querySelector('.week-picker input') as HTMLInputElement;
        weekPicker.value = text;
      }
    });
  }

  mapStaffsAndSchedules(staffs, schedules): StaffSchedule[] {
    return staffs.map(e => {
      const sche = new StaffSchedule();
      sche.staffId = e.id;
      sche.staffName = e.firstName;

      sche.allSchedules = schedules.filter(s => e.id === s.id_staff).map(v => {
        const model = new Schedule(e.id, e.firstName);
        model.updateData(v);
        return model;
      });

      sche.getWeekSchedule(this.weekdays);
      return sche;
    });
  }

  nextWeek(): void {
    this.today.setDate(this.today.getDate() + 7)
    this.changeWeek(this.today);
  }

  prevWeek(): void {
    this.today.setDate(this.today.getDate() - 7)
    this.changeWeek(this.today);
  }

  changeWeek(date?): void {
    //this.currentWeekModel = {day: 1, month: 1, year: 2019}; // can't set value to ngb datepicker => set manually
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    this.today = date ? date : new Date(); // get current system date if param was not passed

    this.weekdays = this.getCurrentWeek();

    const weekPicker = document.querySelector('.week-picker input') as HTMLInputElement;
    const startDate = this.weekdays[0].date;
    const endDate = this.weekdays[6].date;
    let displayText;

    if (startDate.getMonth() === endDate.getMonth()) {
      displayText = `${startDate.getDate()} - ${endDate.getDate()} ${monthNames[startDate.getMonth()]}, ${startDate.getFullYear()}`;
    } else {
      displayText = `${startDate.getDate()} ${monthNames[startDate.getMonth()].slice(0, 3)} - ${endDate.getDate()} ${monthNames[endDate.getMonth()].slice(0, 3)}, ${startDate.getFullYear()}`;
    }
    weekPicker.value = displayText;

    this.loadData(displayText);
  }

  getCurrentWeek(): any[] {
    const options = { day: 'numeric', weekday: 'short', month: 'short' };
    const currDay = new Date(this.today.getTime());
    const week = [];

    for (let i = 1; i <= 7; i++) {
      const first = currDay.getDate() - currDay.getDay() + i;
      const date = new Date(currDay.setDate(first));
      const dateMidnight = date.setHours(0, 0, 0, 0);

      const closed = this.closedDates.filter(cd => {
        const closeStart = new Date(cd.start_date).setHours(0, 0, 0, 0);
        const closeEnd = new Date(cd.end_date).setHours(0, 0, 0, 0);
        return closeStart <= dateMidnight && dateMidnight <= closeEnd;
      });

      week.push({
        date: date,
        isClosed: closed.length > 0 ? true: false,
        closedReason: closed.length > 0 ? closed[0].description : '',
        dateString: date.toLocaleDateString('en-GB', options).replace(',', ''),
      });
    }
    return week;
  }

  compareTimeModel(a, b) {
    return a && b && a.text == b.text;
  }

}