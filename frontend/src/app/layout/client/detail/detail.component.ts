import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

	clients = [
		{
	      id: 123,
	      name: 'Giang Mai',
	      number: '123456789',
	      email: 'giang@mai.com',
	      gender: 'unknown'
	    },
	    {
	      id: 12375,
	      name: 'Giang Mai',
	      number: '123456789',
	      email: 'giang@mai.com',
	      gender: 'unknown'
	    },
	    {
	      id: 12345,
	      name: 'Giang Mai',
	      number: '123456789',
	      email: 'giang@mai.com',
	      gender: 'unknown'
	    },
	    {
	      id: 123234,
	      name: 'Giang Mai',
	      number: '123456789',
	      email: 'giang@mai.com',
	      gender: 'unknown'
	    },
	    {
	      id: 12354,
	      name: 'Giang Mai',
	      number: '123456789',
	      email: 'giang@mai.com',
	      gender: 'unknown'
	    },
	];

	client_id: any;
	client_info: any = {};
	closeResult: string;

  	constructor(private route: Router,
  		private router: ActivatedRoute,
  		private modalService: NgbModal) { }

	ngOnInit() {
		this.router.params.subscribe(params => {this.client_id = params.id;});
		this.loadDetails(this.client_id);
	}

	public loadDetails(id: any){
		let info = this.clients.filter(s => s.id == id);
		this.client_info = info[0];
		console.log(this.client_info);
	}

	goBack() {
		this.route.navigate(['client']);
	}


	open(content) {
        this.modalService.open(content).result.then((result) => {
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

}
