import { Component, OnInit } from '@angular/core';
import { StaffSchedule } from './schedule';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { StaffService } from '../staff.service';

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
  showShift2 = false;

  constructor(
    private modal: NgbModal,
    private notifierService: NotifierService,
    private staffService: StaffService,
  ) {
   }

  ngOnInit() {
    this.getListSchedule();
    this.getStaffs();
  }

  openModal(staff, content: NgbModalRef) {
    this.showShift2 = false; // test

    this.selectedStaff = staff;
    this.modal.open(content, {
      backdrop: 'static',
      size: 'md'
    });
  }

  toggleShift2() {
    this.showShift2 = !this.showShift2;
  }

  getListSchedule() {
    this.staffService.getListSchedule().subscribe(v => {});
  }

  addSchedule() {
    const dto = this.selectedStaff.toDto();
    this.staffService.addSchedule(dto).subscribe(v=> {
      this.notifierService.notify('success', 'A new schedule has been successfully added');
      this.modal.dismissAll();
    });
  }

  getStaffs() {
    this.staffService.getList().subscribe((data: any) => {
      this.schedules = data.user.map(v => {
        let sche = new StaffSchedule();
        sche.staffId = v.id;
        sche.staffName = v.firstName
        return sche;
      });
    });
  }

}
