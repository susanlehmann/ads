import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NgbModal, NgbModalRef, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { Staff } from '../model/staff'

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
	private http: HttpClient,
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
    this.http.post('http://localhost:8000/api/show_user',{id : userId})
    .subscribe((data:any) => {
            this.form.updateData(data);
            this.openModal(content);
        });
  }
	
	getUser() {
    this.loading = true;
		this.http.get('http://localhost:8000/api/list-user')
		.subscribe((listusers:any) => {
        this.loading = false;
		    this.listusers = listusers.map(Staff.toModel);
		});
	}
	
  onSubmit(): void {
    const dto = this.form.toDto();
    console.table(dto);
    if (this.isCreate) {
      this.addStaff(dto);
    } else {
      this.updateStaff(dto);
    }
    this.modal.dismissAll();
    }

  addStaff(staff): void {
    this.http.post('http://localhost:8000/api/create_user',staff)
    .subscribe((data:any) => {
            this.getUser();
        });
    }

  updateStaff(staff) {
    this.http.post('http://localhost:8000/api/update_user',staff)
    .subscribe((data:any) => {
            this.getUser();
        });
    }

  deleteStaff() {
    this.http.post('http://localhost:8000/api/delete_user',{'id': this.selectedId})
      .subscribe((data:any) => {
              this.getUser();
          });
    this.modal.dismissAll();
  }
  

}
