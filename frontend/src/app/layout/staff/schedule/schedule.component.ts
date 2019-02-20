import { Component, OnInit } from '@angular/core';
import { StaffSchedule } from './schedule';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { Schedule } from '../model/schedule'
import { StaffService } from '../staff.service';
import { Staff } from '../model/staff'

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  form: Schedule;
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
  liststaff:[];
  listworking: [];

  constructor(
    private modal: NgbModal,
    private staffService: StaffService,
  ) {
    // this.schedules = new StaffSchedule();
    console.log(this.schedules)
   }

  ngOnInit() {
    this.getschedule();
    this.getliststaff();
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

  save() {
    console.table(this.selectedStaff);
  }

	
	getschedule() {
    this.staffService.getListSchedule()
		.subscribe((listusers:any) => {
        this.listworking = listusers.schedule;
		}, err => {
    });
  }
  
	getliststaff() {
    this.staffService.getList()
		.subscribe((listusers:any) => {
        this.liststaff = listusers.user;
		}, err => {
    });
	}
  // onSubmit(): void {
  //   const dto = this.form.toDto();
  //   if (this.isCreate) {
  //     this.addStaff(dto);
  //   } else {
  //     this.updateStaff(dto);
  //   }
  //   this.modal.dismissAll();
  //   }

  // addS(staff): void {
  //   this.staffService.add(staff)
  //   .subscribe((data:any) => {
  //           this.getUser();
  //           this.notifierService.notify('success', 'A new Staff has been successfully added');
  //   }), err => {
  //   };
  //   }

  // updateStaff(staff) {
  //   this.staffService.update(staff)
  //   .subscribe((data:any) => {
  //           this.getUser();
  //           this.notifierService.notify('success', 'Staff information has been successfully updated');
  //   }), err => {
  //   };
  //   }

  // deleteStaff() {
  //     this.staffService.deleteStaff(this.selectedId)
  //     .subscribe((data:any) => {
  //             this.getUser();
  //             this.notifierService.notify('success', 'A Staff has been successfully deleted');
  //         });
  //   this.modal.dismissAll();
  // }

}
