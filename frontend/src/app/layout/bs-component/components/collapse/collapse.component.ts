import { Component  } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpcallService } from '../../../shared/services/httpcall.service';

@Component({
    selector: 'app-collapse',
    templateUrl: './collapse.component.html',
    styleUrls: ['./collapse.component.scss']
})
export class CollapseComponent {
  online_booking = true;
  closeResult: string;
  title = 'Checkbox';
  treatment;
  isCreate: boolean;
  service;
  name: any;
  selectedAll: any;
  selectedNames: any;
  constructor(private modalService: NgbModal) {
    this.treatment = this.treatments[1];
    this.title = "Select all/Deselect all checkbox - Angular 2";
    this.names = [
      { name: 'Prashobh', selected: false },
      { name: 'Abraham', selected: false },
      { name: 'Anil', selected: false },
      { name: 'Sam', selected: false },
      { name: 'Natasha', selected: false },
      { name: 'Marry', selected: false },
      { name: 'Zian', selected: false },
      { name: 'karan', selected: false },
    ]
      this.selectedAll = !this.selectedAll;

      for (var i = 0; i < this.names.length; i++) {
          this.names[i].selected = this.selectedAll;
      }

  }
  checkIfAllSelected() {
      var totalSelected =  0;
      for (var i = 0; i < this.names.length; i++) {
            if(this.names[i].selected) totalSelected++;
        }
    this.selectedAll = totalSelected === this.names.length;

  return true;
  }



  open(contents) {
    this.modalService.open(contents, { size: 'lg', backdrop: 'static' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  selectedColor = '';

  colors = [
    {
      name: 'yellow',
      value: '#ffff00'
    },
    {
      name: 'red',
      value: '#ff3300'
    },
    {
      name: 'blue',
      value: '#0000ff'
    }
  ];

  onChange(value){
    this.selectedColor = value;
  }

  treatments = [{name: 'demo'},{name: 'dmeo1'},{name: 'demo2'}];
  durations = [{name: '1h'},{name: '2h'},{name:'3h'}];
  services = [{name: 'Everyone'},{name: 'Males only'},{name: 'Females only'}];
  onSubmit(): void {
    const dto = this.form.toDto();
    this.startLoading();
    if (this.isCreate) {
      this.addService(dto);
    } else {
      this.updateService(dto);
    }
    this.modal.dismissAll();
  }
  addService(service): void {
    this.http.post(`${this.baseUrl}/user/create_user`, service)
    .subscribe((data:any) => {
            this.stopLoading();
            this.getUser();
            this.notifierService.notify('success', 'A new Service has been successfully create');
    }), err => {
      this.stopLoading();
    };
  }
  updateService(service) {
    this.http.post(`${this.baseUrl}/user/update_user`, service)
    .subscribe((data:any) => {
            this.stopLoading();
            this.getUser();
            this.notifierService.notify('success', 'Service information has been successfully updated');
    }), err => {
      this.stopLoading();
    };
  }
  deleteStaff() {
    this.http.post(`${this.baseUrl}/user/delete_user`, {'id': this.selectedId})
      .subscribe((data:any) => {
              this.getUser();
              this.notifierService.notify('success', 'A Service has been successfully deleted');
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
