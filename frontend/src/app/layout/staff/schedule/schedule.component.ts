import { Component, OnInit } from '@angular/core';
import { StaffSchedule } from './schedule';
import {NgbModal, NgbModalRef, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  weekdays = [
    'Sun', 
    'Mon', 
    'Tue', 
    'Wed', 
    'Thu', 
    'Fri', 
    'Sat', 
  ];
  schedules: StaffSchedule[];
  selectedStaff: StaffSchedule;
  isCreate = false;

  constructor(
    private modal: NgbModal,
  ) {
    this.schedules = [
      new StaffSchedule(),
      new StaffSchedule(),
      new StaffSchedule(),
    ];
   }

  ngOnInit() {
  }

  openModal(staff, content: NgbModalRef) {
    this.selectedStaff = staff;
    // this.modal.open(content, {
    //   backdrop: 'static',
    //   size: 'lg'
    // });
  }

}
