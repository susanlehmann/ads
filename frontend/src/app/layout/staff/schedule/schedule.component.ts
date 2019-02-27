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
  today: Date;
  schedules: StaffSchedule[];
  allSchedules: StaffSchedule[];
  selectedSchedule: Schedule;

  currentWeekModel: NgbDateStruct;
  staffFilter: number;
  selectedStaff: StaffSchedule;

  isConfirmDeleteRepeat: boolean;

  constructor(
    private modal: NgbModal,
    private notifierService: NotifierService,
    private staffService: StaffService,
  ) {
    this.today = new Date();
    this.weekdays = this.getCurrentWeek();
    this.staffFilter = 0; // show all staff
    this.currentWeekModel = { day: 1, month: 1, year: 2019 };
  }

  ngOnInit() {
    this.changeWeek();
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
      this.schedules = this.allSchedules;

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
      displayText = `${startDate.getDate()} ${monthNames[startDate.getMonth()].slice(0, 3)} - ${endDate.getDate()} ${monthNames[endDate.getMonth()].slice(0, 3)} , ${startDate.getFullYear()}`;
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
      week.push({ date: date, dateString: date.toLocaleDateString('en-US', options) });
    }
    return week;
  }

}
