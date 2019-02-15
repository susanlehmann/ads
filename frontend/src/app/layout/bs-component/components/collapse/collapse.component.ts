import { Component, OnInit, NgModule  } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Collapse } from './model/group';
import { HttpcallService } from '../../../../shared/services/httpcall.service';
import { NotifierService } from 'angular-notifier';
import { HttpClient } from '@angular/common/http';
//import { group } from '@angular/animations';
import { DxListModule, DxTemplateModule } from 'devextreme-angular';
//import { Employee, Service } from './collapse.service';
@Component({
    selector: 'app-collapse',
    templateUrl: './collapse.component.html',
    styleUrls: ['./collapse.component.scss']
})

@NgModule({
  imports: [
      DxListModule,
      DxTemplateModule
  ],
  declarations: [CollapseComponent],
  bootstrap: [CollapseComponent]
})
export class CollapseComponent implements OnInit {
  vouchersale = true;
  loading: boolean;
  online_booking = true;
  closeResult: string;
  title = 'Checkbox';
  treatment;
  isCreate: boolean;
  service;
  name: any;
  selectedAll: any;
  selectedNames: any;
  groupColors: string[];
  public error = [];
  listgroups: Collapse[];
  names;
  form = new Collapse();
  groupDescription: string;
  eid: number;
  selectedId: string;
  isUpdate: boolean;
  isOpened = true;
  public isCollapsed = false;
  // mock data
  treatments = [{name: 'demo'},{name: 'dmeo1'},{name: 'demo2'}];
  durations = [{name: '1h'},{name: '2h'},{name:'3h'}];
  services = [{name: 'Everyone'},{name: 'Males only'},{name: 'Females only'}];
  extratimes = [{name: 'No extra time', eid: '1'},{name: 'Processing time after',eid:'2'},{name: 'Blocked time after',eid:'3'}];
  durationextras = [{name: 'asdsad', eid:'1'},{name: 'asdasdasdasd',eid:'1'},{name: 'sadasdasdasdasd',eid:'2'}]
  taxs =[{name: 'No tax'},{name: 'Default: No tax'}]
  voucherexpirys = [{name: 'Default: 6 month'},{name: '1 month'},{name: '2 month'},{name: '3 month'},{name: '4 month'},{name: '5 month'},{name: 'no expiry'}]
  public isDisabledDurationExtras: boolean = true;
  modal: any;
  ngOnInit() {
    this.getGroup();
  }

  constructor(private modalService: NgbModal, private http: HttpClient,
    private httpService: HttpcallService,
    private notifierService: NotifierService
  ) {
    this.groupColors = [
      'red', 'green', 'yellow', 'olive', 'orange', 'teal', 'blue', 'violet', 'purple', 'pink'
    ];
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
    };

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
    this.isCreate = true;
    this.form.new();
    this.modalService.open(contents, { size: 'lg', backdrop: 'static' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  updategroup(service_groups,groupID){
    this.isUpdate = true;
    this.selectedId = groupID;
    //this.Collapse.findById(groupID)
    this.modalService.open(service_groups, { size: 'lg', backdrop: 'static' }).result.then((result) => {
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

  getGroup() {
    this.startLoading();
    this.http.get(`http://localhost:8000/api/admin/service_group/list-service-group`)
    .subscribe((listservicegroups:any) => {
        this.stopLoading();
        this.listgroups = listservicegroups.service_group
        .map(Collapse.toModel)
        .sort((a, b) => {
          return a.id - b.id;
        });
    }, err => {
      this.stopLoading();
    });
  }

  onSubmit(): void{
    const dto = this.form.toDto();
    this.startLoading();
    if (this.isCreate) {
       this.addGroup(dto);
    } else {
       alert('something wrong');
    }
     this.modalService.dismissAll();
    }

  onUpdate(): void{
    const dto = this.form.toDto();
    this.startLoading();
    if (this.isUpdate){
      this.updateGroup(dto);
    }
     this.modalService.dismissAll();
  }
  addGroup(service_group): void {
    this.http.post(`http://localhost:8000/api/admin/service_group/create-service-group`, service_group)
    .subscribe((data:any) => {
      this.stopLoading();
      this.getGroup();
      this.notifierService.notify('success', 'A new Group has been successfully added');
    }), err => {
      this.stopLoading();
    };
    }

  updateGroup(service_group): void {
    this.http.post(`http://localhost:8000/api/admin/service_group/update-service-group`, service_group)
    .subscribe((data:any) => {
      this.stopLoading();
      this.getGroup();
      this.notifierService.notify('success', 'Group information has been successfully updated');
    }), err => {
      this.stopLoading();
    };
    }

  deleteGroup() {
    if(confirm("are you sure you want to delete"  + "?")){
    this.http.post(`http://localhost:8000/api/admin/service_group/delete-service-group`, {'id':  this.selectedId})
      .subscribe((data:any) => {
        console.log(data);
        this.getGroup();
        this.notifierService.notify('success', 'A Group has been successfully deleted');
      });
     this.modalService.dismissAll();
    }
  }

  startLoading(){
    this.loading = true;
  }

  stopLoading(){
    this.loading = false;
  }

}
