import { Component, OnInit } from '@angular/core';
import { StaffSchedule, Schedule } from './schedule';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { StaffService } from '../staff.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  weekdays: any[];
  today: Date;
  schedules: StaffSchedule[];
  allSchedules: StaffSchedule[];
  selectedSchedule: Schedule;

  staffFilter: number;
  selectedStaff: StaffSchedule;

  conflictedSchedules: Schedule[];

  constructor(
    private modal: NgbModal,
    private notifierService: NotifierService,
    private staffService: StaffService,
  ) {
    this.today = new Date();
    this.weekdays = this.getCurrentWeek();
    this.staffFilter = 0; // show all staff
    this.conflictedSchedules = [];
   }

  ngOnInit() {
    this.loadData();
  }

  openModal(content: NgbModalRef, schedule: Schedule) {
    this.selectedStaff = this.schedules.filter(s => s.staffId === schedule.staffId)[0];
    this.selectedSchedule = schedule;
    this.modal.open(content, {
      backdrop: 'static',
      size: 'md'
    });
  }

  changeStaff(staffId) {
    if (staffId == 0) { // show all staff
      this.schedules = [...this.allSchedules];
    } else {
      this.schedules = this.allSchedules.filter(s => s.staffId == staffId);
    }
  }

  deleteSchedule(id?) {
    let sId = id ? id : this.selectedSchedule.staffId;
    // this.staffService.deleteScheduleById(sId).subscribe(v => {
    // });

  }

  overrideUpcoming() {
    this.conflictedSchedules.forEach(c => {
      this.deleteSchedule(c.staffId);
    });
  }

  onClickUpdateUpcoming() {
    if (this.selectedSchedule.isNew) {
      this.addSchedule();
      this.overrideUpcoming();
    } else {
      this.updateSchedule();
    }

  }

  onClickUpdateThisShiftOnly() {
    this.addSchedule();
    
    if(!this.selectedSchedule.isNew) {

    }

  }

  saveSchedule(confirmOverrideModal) {
    this.conflictedSchedules = this.selectedStaff.findFutureConflicts(this.selectedSchedule);

    // has future conflict
    if(this.selectedSchedule.isRepeat) { //&& this.conflictedSchedules.length > 0
      this.modal.open(confirmOverrideModal, {
        backdrop: 'static',
        size: 'md'
      });
      return;
    }

    this.selectedSchedule.scheduleStartDate = this.selectedSchedule.currentDate;
    this.addSchedule();
    this.modal.dismissAll();
  }

  addSchedule() {
    const dto = this.selectedSchedule.toDto();
    this.staffService.addSchedule(dto).subscribe(v=> {
      this.notifierService.notify('success', 'A new schedule has been successfully added');
    });
  }

  updateSchedule() {
    const dto = this.selectedSchedule.toDto();
    this.staffService.updateCSchedule(dto).subscribe(v=> {
      this.notifierService.notify('success', 'The schedule has been successfully updated');
    });
  }

  loadData() {
    const schedules = this.staffService.getListSchedule();
    const staffs = this.staffService.getList();
    
    forkJoin([schedules, staffs]).subscribe((rs: any) => {
      this.allSchedules = this.mapStaffsAndSchedules(rs[1].user, rs[0].workinghour);
      this.schedules = [...this.allSchedules];
    });
  }

  mapStaffsAndSchedules(staffs, schedules) {
    return staffs.map(e => {
      let sche = new StaffSchedule();
      sche.staffId = e.id;
      sche.staffName = e.firstName

      sche.allSchedules = schedules.filter(s => e.id === s.id_staff).map(v => {
        let model = new Schedule(e.id, e.firstName);
        model.updateData(v);
        return model;
      });

      sche.getWeekSchedule(this.weekdays);
      return sche;
    });
  }

  nextWeek() {
    this.today.setDate(this.today.getDate()+7);
    this.weekdays = this.getCurrentWeek();
  }
  prevWeek() {
    this.today.setDate(this.today.getDate()-7);
    this.weekdays = this.getCurrentWeek();
  }

  getCurrentWeek() {
    const options = { day: 'numeric', weekday: 'short', month: 'short' };
    const currDay = new Date(this.today.getTime());
    const week = []
  
  for (let i = 1; i <= 7; i++) {
    let first = currDay.getDate() - currDay.getDay() + i 
    let date = new Date(currDay.setDate(first));
    week.push({date: date, dateString: date.toLocaleDateString('en-US', options)})
  }
  return week;
  }

}
