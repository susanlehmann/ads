import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {NgbModal, NgbModalRef, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { User } from './User'
import { HttpcallService } from '../../shared/services/httpcall.service';

@Component({
selector: 'app-users',
templateUrl: './users.component.html',
styleUrls: ['./users.component.scss'],
animations: [routerTransition()]
})

export class UsersComponent implements OnInit {

  form: User;

  modalOptions: NgbModalOptions;
  public error = [];

	closeResult: string;
  listusers: User[];
  listrole: [];
  isCreate: boolean;
  colors: string[];
  
	constructor(
	private httpService: HttpcallService,
	private http: HttpClient,
	private modal: NgbModal, 
	) {
    this.form = new User();
    this.colors = [
      'red', 'green', 'yellow', 'olive', 'orange', 'teal', 'blue', 'violet', 'purple', 'pink'
    ];
		this.getUser();
	}

	ngOnInit() {
    this.modalOptions = {
      backdrop: 'static',
      size: 'lg'
    };
    this.test();
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
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openCreateModal(content: NgbModalRef) {
    this.isCreate = true;
    this.form.new();
    this.openModal(content);
  }

  openUpdateModal(content: NgbModalRef, userId) {
    this.isCreate = false;
    this.http.post(`${this.httpService.getBaseUrl()}/show_user`,{id : userId})
    .subscribe((data:any) => {
            this.form.updateData(data.user);
            this.listrole = data.role;
            this.openModal(content);
        });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
	
	getUser() {
		return this.http.get(`${this.httpService.getBaseUrl()}/list-user`)
		.subscribe((listusers:any) => {
        this.listusers = listusers.user.map(User.toModel);
        this.listrole = listusers.role;
		});
	}
	
    onSubmit() {
      const dto = this.form.toDto();
      console.table(dto);
      if (this.isCreate) {
        this.Crete_user(dto);
      } else {
        this.update_user(dto);
      }
      this.modal.dismissAll();
      }

  Crete_user(user) {
    this.http.post(`${this.httpService.getBaseUrl()}/create_user`,user)
    .subscribe((data:any) => {
            this.getUser();
        });
    }

  update_user(user) {
    this.http.post(`${this.httpService.getBaseUrl()}/update_user`,user)
    .subscribe((data:any) => {
            this.getUser();
        });
    }

	dalete_user(id) {
		return this.http.post(`${this.httpService.getBaseUrl()}/delete_user`,{'id':id})
      .subscribe((data:any) => {
              this.getUser();
          });
	}
}