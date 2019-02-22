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

  selectedStaff: number;

  constructor(
    private modal: NgbModal,
    private notifierService: NotifierService,
    private staffService: StaffService,
  ) {
    this.today = new Date();
    this.weekdays = this.getCurrentWeek();
    this.selectedStaff = 0; // all staff
   }

  ngOnInit() {
    this.loadData();
  }

  openModal(content: NgbModalRef, schedule) {
    this.selectedSchedule = schedule;
    this.modal.open(content, {
      backdrop: 'static',
      size: 'md'
    });
  }

  changeStaff(staffId) {
    if (staffId == 0) {
      this.schedules = [...this.allSchedules];
    }
    this.schedules = this.allSchedules.filter(s => s.staffId == staffId);
  }

  deleteSchedule() {

  }

  saveSchedule(confirmOverrideModal) {
    if(this.selectedSchedule.isRepeat) {
      this.modal.open(confirmOverrideModal, {
        backdrop: 'static',
        size: 'md'
      });
      return;
    }

    const dto = this.selectedSchedule.toDto();
    this.staffService.addSchedule(dto).subscribe(v=> {
      this.notifierService.notify('success', 'A new schedule has been successfully added');
      this.modal.dismissAll();
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

      sche.allSchedules = schedules.filter(s => e.id === s.id).map(v => {
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
