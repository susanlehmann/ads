import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NgbModal, NgbModalRef, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { Staff } from '../model/staff'
import { NotifierService } from 'angular-notifier';
import { StaffService } from '../staff.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
  loading: boolean;
  form: Staff;

  modalOptions: NgbModalOptions;
  public error = [];

	closeResult: string;
  listusers: Staff[];
  isCreate: boolean;
  colors: string[];
  selectedId: string;
  
	constructor(
  private notifierService: NotifierService,
  private http: HttpClient,
  private modal: NgbModal,
  private staffService: StaffService,
	) {
    this.form = new Staff();
    this.colors = [
      'red', 'green', 'yellow', 'olive', 'orange', 'teal', 'blue', 'violet', 'purple', 'pink'
    ];
    this.modalOptions = {
      backdrop: 'static',
      size: 'lg'
    };
	}

	ngOnInit() {
    this.test();
    this.getUser();
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
  
  openModal(content: NgbModalRef) {
    this.modal.open(content, this.modalOptions).result.then((result) => {
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

  openUpdateModal(content: NgbModalRef, userId) {
    this.isCreate = false;
    this.selectedId = userId;
    this.staffService.findById(userId)
    .subscribe((data:any) => {
            this.form.updateData(data.user);
            this.openModal(content);
        });
  }
	
	getUser() {
    this.startLoading();
    this.staffService.getList()
		.subscribe((listusers:any) => {
        this.stopLoading();
        this.listusers = listusers.user
        .map(Staff.toModel)
        .sort((a, b) => {
          return a.id - b.id;
        });
		}, err => {
      this.stopLoading();
    });
	}
	
  onSubmit(): void {
    const dto = this.form.toDto();
    this.startLoading();
    if (this.isCreate) {
      this.addStaff(dto);
    } else {
      this.updateStaff(dto);
    }
    this.modal.dismissAll();
    }

  addStaff(staff): void {
    this.staffService.update(staff)
    .subscribe((data:any) => {
            this.stopLoading();
            this.getUser();
            this.notifierService.notify('success', 'A new Staff has been successfully added');
    }), err => {
      this.stopLoading();
    };
    }

  updateStaff(staff) {
    this.staffService.update(staff)
    .subscribe((data:any) => {
            this.stopLoading();
            this.getUser();
            this.notifierService.notify('success', 'Staff information has been successfully updated');
    }), err => {
      this.stopLoading();
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
  
  startLoading(): void {
    this.loading = true;
  }

  stopLoading(): void {
    this.loading = false;
  }

}
