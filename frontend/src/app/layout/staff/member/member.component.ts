import { Component, OnInit } from '@angular/core';
import { NgbDateParserFormatter, NgbModal, NgbModalOptions, NgbModalRef, NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { ServicesService } from 'src/app/shared/services/serv.service';
import { NgbDateEnGbParserFormatter } from '../close-date/NgbDateEnGbParserFormatter';
import { Staff } from '../model/staff';
import { StaffService } from '../staff.service';
import { ExcelService } from 'src/app/shared/services/export.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  providers: [
    { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter },
    { provide: NgbDateParserFormatter, useClass: NgbDateEnGbParserFormatter },
  ],
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
  form: Staff;

  modalOptions: NgbModalOptions;
  modalOptions1: NgbModalOptions;
  public error = [];

	closeResult: string;
  listusers: Staff[];
  isCreate: boolean;
  colors: string[];
  selectedId: string;

  services: any[];
  permissions: any[];
  selectAll = true;
  keyWordChanged = new Subject<string>();
  keyword: string;
  
	constructor(
  private notifierService: NotifierService,
  private modal: NgbModal,
  private staffService: StaffService,
  private svService: ServicesService,
  private exportService: ExcelService,
	) {
    this.form = new Staff();
    this.colors = [
      'red', 'green', 'yellow', 'olive', 'orange', 'teal', 'blue', 'violet', 'purple', 'pink'
    ];
    this.modalOptions = {
      backdrop: 'static',
      size: 'lg'
    };
    this.modalOptions1 = {
      backdrop: 'static',
      size: 'md'
    };
    this.permissions = [
      'No Access',
      'Basic',
      'Low',
      'Medium',
      'High',
    ];
  }
 
  onDrop(event: CdkDragDrop<string[]>) {
    //TODO: wait for sort api
    moveItemInArray(this.listusers, event.previousIndex, event.currentIndex);
    const sortedList = [];
    this.listusers.forEach((v, index) => {
      sortedList.push({
        id: v.id,
        sort_order: index,
      });
    });
    this.staffService.sortStaff(sortedList)
    .subscribe((data:any) => {
            this.notifierService.notify('success', 'Staff order has been updated');
    }), err => {
    };
  }

	ngOnInit() {
    this.test();
    this.getUser();
    this.getServices();
    this.keyWordChanged.pipe(
      debounceTime(500))
      .subscribe(text => {
        this.keyword = text;
        this.searchProduct();
    });
  }

  test() {
    const pressed = [];
    const secret = 'test';
    window.addEventListener('keyup', e => {
    pressed.push(e.key);
    pressed.splice(-secret.length - 1, pressed.length - secret.length);
    if (pressed.join('').includes(secret)) {
      this.form.mockData();
    }
    });
  }

  changed(text) {
    this.keyWordChanged.next(text);
  }

  searchProduct() {
    this.staffService.searchStaff(this.keyword).subscribe((list: any) => {
      this.listusers = list.user
      .map(Staff.toModel)
      .sort((a, b) => {
        return a.sortOrder - b.sortOrder;
      });
    });
  }

  onSelectAllService(value: boolean): void {
    if (value) {
      this.services = this.services.map(v => {
        v.selected = true;
        return v;
      });
    } else {
      this.services = this.services.map(v => {
        v.selected = false;
        return v;
      });
    }
  }
  
  onSelectService(value: boolean, serviceId): void {
    const hasNotSelectAll = this.services.filter(v => !v.selected)[0];
    if (hasNotSelectAll) {
      this.selectAll = false;
    } else {
      this.selectAll = true;
    }
  }

  resetPassword(): void {
    this.staffService.resetPassword(this.form.email).subscribe(v => {
      this.notifierService.notify('success', `Password setup email was sent to ${this.form.firstName}`);
    });
  }
  
  openModal(content: NgbModalRef) {
    this.modal.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  }

  openDelete(content: NgbModalRef) {
    this.modal.open(content, this.modalOptions1).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  }

  openCreateModal(content: NgbModalRef) {
    this.isCreate = true;
    this.form.new();
    this.openModal(content);
  }

  openModalDelete(content: NgbModalRef){
    this.openDelete(content);
  }

  openUpdateModal(content: NgbModalRef, userId) {
    this.isCreate = false;
    this.selectedId = userId;
    this.staffService.findById(userId)
    .subscribe((data:any) => {
            this.form.updateData(data.user);
            this.openModal(content);
        });
  }

  getServices() {
    const req = {ownerId: JSON.parse(localStorage.getItem('user')).id};
    this.svService.listServiceIngroup(req).subscribe(v => {
      this.services = v.service.map(s => {
        return {id: s.id, name_service: s.name_service, selected: true};
      });
    });
  }
	
	getUser() {
    this.staffService.getList()
		.subscribe((listusers:any) => {
        this.listusers = listusers.user.map(Staff.toModel);
		}, err => {
    });
  }

  onSubmit(): void {
    let isValidForm = true;
    let isValidEmail = true;
    let isNotTakenEmail = true;
    
    if (!this.form.firstName) {
      this.notifierService.notify('error', 'First name is required');
      document.querySelector('input[name="first-name"]').classList.add('is-invalid');
      isValidForm = false;
    }

    if (this.form.email.length > 0 && !this.form.email.match(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)) {
        this.notifierService.notify('error', `${this.form.email} is not a valid email`);
        document.querySelector('input[name="email"]').classList.add('is-invalid');
        isValidEmail = false;
    }

    const found = this.listusers.filter(u => u.email === this.form.email)[0];
    if (found && this.form.id != found.id) {
      this.notifierService.notify('error', `${this.form.email} has already been taken`);
      document.querySelector('input[name="email"]').classList.add('is-invalid');
      isNotTakenEmail = false;
    }

    if (!isValidForm) {
      return;
    } else {
      document.querySelector('input[name="first-name"]').classList.remove('is-invalid');
    }

    if (!isValidEmail || !isNotTakenEmail) {
      return;
    } else {
      document.querySelector('input[name="email"]').classList.remove('is-invalid');
    }

    const dto = this.form.toDto();
    if (this.isCreate) {
      this.addStaff(dto);
    } else {
      this.updateStaff(dto);
    }
    this.modal.dismissAll();
    }

  addStaff(staff: Staff): void {
    staff.setOrderToLast(this.listusers);
    this.staffService.add(staff)
    .subscribe((data:any) => {
            this.getUser();
            this.staffService.verifyEmail(this.form.email).subscribe(v => {}); // send mail to staff for verifing & creating password
            this.staffService.resetPassword(this.form.email).subscribe(v => {});
            this.notifierService.notify('success', 'A new Staff has been successfully added');
    }), err => {
    };
    }

  updateStaff(staff) {
    this.staffService.update(staff)
    .subscribe((data:any) => {
            this.getUser();
            this.notifierService.notify('success', 'Staff information has been successfully updated');
    }), err => {
    };
    }

  deleteStaff() {
      this.staffService.deleteStaff(this.selectedId)
      .subscribe((data:any) => {
              this.getUser();
              this.notifierService.notify('success', 'A Staff has been successfully deleted');
          });
    this.modal.dismissAll();
  }

  export(type: string): void {
    let data = this.listusers.map(s => {
      return {
        'First Name': s.firstName,
        'Last Name': s.lastName,
        'Mobile Number': s.mobileNumber,
        'Email': s.email,
        'Appointments': s.appointmentBooking ? 'Enabled' : 'Disabled',
        'User Permission': s.userPermission,
        'Start Date': s.employmentStartDate,
        'End Date': s.employmentEndDate,
        'Notes': s.notes,
        'Service Commission': s.commissions.service,
        'Product Commission': s.commissions.product,
        'Voucher Commission': s.commissions.voucherSale,
      };
    });
		if(type == 'excel') {
			this.exportService.exportAsExcelFile(data, 'staff');
		} else if (type == 'csv') {
			this.exportService.exportAsCSVFile(data, 'staff');
		}
  }

}
