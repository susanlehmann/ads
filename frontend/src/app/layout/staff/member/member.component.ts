import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbModalRef, NgbModalOptions, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { Staff } from '../model/staff'
import { NotifierService } from 'angular-notifier';
import { StaffService } from '../staff.service';
import { ServicesService } from 'src/app/shared/services/serv.service';
import { NgbDateEnGbParserFormatter } from '../close-date/NgbDateEnGbParserFormatter';

@Component({
  providers: [{provide: NgbDateParserFormatter, useClass: NgbDateEnGbParserFormatter}],
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
  
	constructor(
  private notifierService: NotifierService,
  private modal: NgbModal,
  private staffService: StaffService,
  private svService: ServicesService,
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

	ngOnInit() {
    this.test();
    this.getUser();
    this.getServices();
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
        this.listusers = listusers.user
        .map(Staff.toModel)
        .sort((a, b) => {
          return a.id - b.id;
        });
		}, err => {
    });
	}
	
  onSubmit(): void {
    const dto = this.form.toDto();
    if (this.isCreate) {
      this.addStaff(dto);
    } else {
      this.updateStaff(dto);
    }
    this.modal.dismissAll();
    }

  addStaff(staff): void {
    this.staffService.add(staff)
    .subscribe((data:any) => {
            this.getUser();
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

}
