import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbModalRef, NgbDate} from '@ng-bootstrap/ng-bootstrap';
import { StaffService } from '../staff.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-close-date',
  templateUrl: './close-date.component.html',
  styleUrls: ['./close-date.component.scss']
})
export class CloseDateComponent implements OnInit {
  dates: ClosedDate[];
  selectedId;
  isAdd = true;

  form: ClosedDate;

  constructor(
    private modal: NgbModal,
    private staffService: StaffService,
    private notifierService: NotifierService,
  ) {
      this.form = new ClosedDate();
   }

  ngOnInit() {
    this.getList();
  }

  getList() {
    let sort = (a,b) => {return a.id - b.id};
    this.staffService.getListClosedDate().subscribe((dates: []) => {
      this.dates = dates.map(ClosedDate.toModel).sort(sort);
    });
  }


  openModal(content: NgbModalRef) {
    this.modal.open(content, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  openAddModal(content: NgbModalRef) {
    this.isAdd = true;
    this.form = new ClosedDate();
    this.openModal(content);
  }

  openUpdateModal(content: NgbModalRef, id) {
    this.isAdd = false;
    this.selectedId = id;
    this.staffService.findClosedDateById(id)
    .subscribe((data:any) => {
            this.form.updateData(data.close_date);
            this.openModal(content);
        });
  }

  delete(){
    this.staffService.deleteClosedDateById(this.selectedId).subscribe(v=>{
      this.getList();
      this.notifierService.notify('success', 'Closed date has been successfully deleted');
    });
    this.modal.dismissAll();
  }

  save(){
    const dto = this.form.toDto();
    if(this.isAdd) {
      this.add(dto);
    } else {
      this.update(dto);
    }
    this.modal.dismissAll();
  }

  add(dto){
    this.staffService.addClosedDate(dto).subscribe(v => {
      this.getList();
      this.notifierService.notify('success', 'A new closed date has been successfully added');
    });
  }

  update(dto) {
    this.staffService.updateClosedDate(dto).subscribe(v => {
      this.getList();
      this.notifierService.notify('success', 'Closed date has been successfully updated');
    });
  }

}

class ClosedDate  {
  id;
  businessId;
  startDate: NgbDate;
  endDate: NgbDate;
  description;
  locations: [];
  outputDate: string;
  noOfDays: string;

  constructor() {
    this.id = 1;
    this.startDate = null;
    this.endDate = null;
    this.locations = [];
    this.noOfDays = '';
  }

  getOutputDate(data) {
    const options = {weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'};
    const startDate = new Date(data.start_date).toLocaleDateString('en-US', options);
    const endDate = new Date(data.end_date).toLocaleDateString('en-US', options);
    this.outputDate = `${startDate} - ${endDate}`;
  }

  updateData(data){
    this.id = data.id;
    this.businessId = data.business_id;
    const one_day=1000*60*60*24;
    const str = new Date(data.start_date);
    const end = new Date(data.end_date);
    this.startDate = new NgbDate(str.getUTCFullYear(), str.getUTCMonth()+1, str.getUTCDate());
    this.endDate = new NgbDate(end.getUTCFullYear(), end.getUTCMonth()+1, end.getUTCDate());
    this.noOfDays = `${ Math.round((end.getTime() - str.getTime() ) / one_day)} days`;
    this.description = data.description;
    this.getOutputDate(data);
  }

  toDto(){
    return {
      id: this.id,
      start_date: `${this.startDate.year}-${this.startDate.month}-${this.startDate.day}`,
      end_date: `${this.endDate.year}-${this.endDate.month}-${this.endDate.day}`,
      description: this.description,
      locations: [],
    }
  }

  static toModel(data): ClosedDate {
    const d = new ClosedDate();
    d.updateData(data);
    return d;
  }
}
