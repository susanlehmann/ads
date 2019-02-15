import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CountryPickerModule } from 'ngx-country-picker';
@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})

export class SupplierComponent implements OnInit {
  postal_address = true;
  closeResult: string;
  countryForm: FormGroup;
  modalOptions: NgbModalOptions;
  countries = ['USA', 'Canada', 'Uk', 'VN', 'JP']
  suppliers =[{name: 'aaa',phone: '11028883', email: 'asdjhajs@gmail.com',productassigned: '1',updatetime: '25 Jan 2019, 13:52'},{name: 'awwwwaa',phone: '11028883', email: 'asasddjhajs@gmail.com',productassigned: '2',updatetime: '27 Jan 2019, 13:52'}]
  constructor(private modalService: NgbModal) {
    this.modalOptions = {
      backdrop: 'static',
      size: 'lg'
    };

  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg', backdrop: 'static'}).result.then((result) => {
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


  ngOnInit() {
  }
}
