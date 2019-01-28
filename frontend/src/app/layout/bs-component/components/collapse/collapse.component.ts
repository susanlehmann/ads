import { Component  } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-collapse',
    templateUrl: './collapse.component.html',
    styleUrls: ['./collapse.component.scss']
})
export class CollapseComponent {
  closeResult: string;

  constructor(private modalService: NgbModal) {}



  open(contents) {
    this.modalService.open(contents, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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

}
