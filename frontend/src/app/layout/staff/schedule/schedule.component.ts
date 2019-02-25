import { Component, OnInit } from '@angular/core';
import { StaffSchedule, Schedule } from './schedule';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {NgbDateAdapter, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { StaffService } from '../staff.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class ScheduleComponent implements OnInit {
  weekdays: any[];
  today: Date;
  schedules: StaffSchedule[];
  allSchedules: StaffSchedule[];
  selectedSchedule: Schedule;

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
   }

  ngOnInit() {
    this.loadData();
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
    this.selectedSchedule.setEndScheduleToPreviousWeek(); // TODO: check thieu case?
    this.updateSchedule();
  }

  overrideUpcoming() {
    this.selectedStaff.conflictedSchedules.forEach(c => {
      this.deleteSchedule(c.staffId);
    });
  }

  onClickUpdateUpcoming() {
    if (this.selectedSchedule.isNew) { // new schedule
      this.addSchedule();
    } else {
      this.updateSchedule();
    }
    this.overrideUpcoming();

  }

  onClickUpdateThisShiftOnly() {
    const clone = this.selectedSchedule.clone();
        this.selectedSchedule.setEndScheduleToPreviousWeek();
    if (this.selectedSchedule.isNew) { // new mode
      this.selectedSchedule.setToNoRepeat();
      this.addSchedule();
    } else { // update mode
      if (this.selectedSchedule.isScheduleStartOnCurrentDate()) {
        this.selectedSchedule.setStartScheduleToNextWeek();
        this.updateSchedule();
      } else {
        const clone = this.selectedSchedule.clone();
        this.selectedSchedule.setEndScheduleToPreviousWeek();
        this.updateSchedule();
      }

    }
  }

  onClickSaveSchedule(confirmOverrideModal) {
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

  addSchedule() {
    const dto = this.selectedSchedule.toDto();
    this.staffService.addSchedule(dto).subscribe(v => {
      this.loadData();
      this.modal.dismissAll();
      this.notifierService.notify('success', 'A new schedule has been successfully added');
    });
  }

  updateSchedule() {
    const dto = this.selectedSchedule.toDto();
    this.staffService.updateSchedule(dto).subscribe(v => {
      this.loadData();
      this.modal.dismissAll();
      this.notifierService.notify('success', 'The schedule has been successfully updated');
    });
  }

  deleteSchedule(id?) {
    id = id ? id : this.selectedSchedule.id;
    this.staffService.deleteScheduleById(id).subscribe(v => {
      this.modal.dismissAll();
      this.loadData();
    });
  }

  loadData() {
    const schedules = this.staffService.getListSchedule();
    const staffs = this.staffService.getList();

    forkJoin([schedules, staffs]).subscribe((rs: any) => {
      this.allSchedules = this.mapStaffsAndSchedules(rs[1].user, rs[0].workinghour);
      this.schedules = this.allSchedules;
    });
  }

  mapStaffsAndSchedules(staffs, schedules) {
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

  nextWeek() {
    this.today.setDate(this.today.getDate() + 7);
    this.weekdays = this.getCurrentWeek();
    this.loadData();
  }

  prevWeek() {
    this.today.setDate(this.today.getDate() - 7);
    this.weekdays = this.getCurrentWeek();
    this.loadData();
  }

  getCurrentWeek() {
    const options = { day: 'numeric', weekday: 'short', month: 'short' };
    const currDay = new Date(this.today.getTime());
    const week = [];

  for (let i = 1; i <= 7; i++) {
    const first = currDay.getDate() - currDay.getDay() + i;
    const date = new Date(currDay.setDate(first));
    week.push({date: date, dateString: date.toLocaleDateString('en-US', options)});
  }
  return week;
  }

}
