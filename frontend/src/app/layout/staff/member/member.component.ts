import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NgbModal, NgbModalRef, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { Staff } from '../model/staff'
import { NotifierService } from 'angular-notifier';
import { HttpcallService } from '../../../shared/services/httpcall.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
  loading: boolean;
  baseUrl: string;
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
  private httpService: HttpcallService,
	private modal: NgbModal, 
	) {
    this.form = new Staff();
    this.colors = [
      'red', 'green', 'yellow', 'olive', 'orange', 'teal', 'blue', 'violet', 'purple', 'pink'
    ];
    this.modalOptions = {
      backdrop: 'static',
      size: 'lg'
    };
    this.baseUrl = this.httpService.getBaseUrl();
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
    this.http.post(`${this.baseUrl}/user/show_user`,{id : userId})
    .subscribe((data:any) => {
            this.form.updateData(data.user);
            this.openModal(content);
        });
  }
	
	getUser() {
    this.startLoading();
		this.http.get(`${this.baseUrl}/user/staff/list-user`)
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
    this.http.post(`${this.baseUrl}/user/create_user`, staff)
    .subscribe((data:any) => {
            this.stopLoading();
            this.getUser();
            this.notifierService.notify('success', 'A new Staff has been successfully added');
    }), err => {
      this.stopLoading();
    };
    }

  updateStaff(staff) {
    this.http.post(`${this.baseUrl}/user/update_user`, staff)
    .subscribe((data:any) => {
            this.stopLoading();
            this.getUser();
            this.notifierService.notify('success', 'Staff information has been successfully updated');
    }), err => {
      this.stopLoading();
    };
    }

  deleteStaff() {
    this.http.post(`${this.baseUrl}/user/delete_user`, {'id': this.selectedId})
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
