import { Component, OnInit } from '@angular/core';
import { StaffSchedule } from './schedule';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { Schedule } from '../model/schedule'

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
    this.staffService.getList()
		.subscribe((listusers:any) => {
        this.listusers = listusers.user
        .map(Staff.toModel)
        .sort((a, b) => {
          return a.id - b.id;
        });
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
