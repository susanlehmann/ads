import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../shared/services/user.service';
import { NotifierService } from 'angular-notifier';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

	clients = [];

	client_id: any;
	client_info: any = {};
	closeResult: string;
  blockReason: any = "";
  textBlock: any = "";

  	constructor(private route: Router,
  		private router: ActivatedRoute,
  		private modalService: NgbModal,
  		private userService: UserService,
    	private notifierService: NotifierService,
      private datePipe: DatePipe) { }

	ngOnInit() {
		this.router.params.subscribe(params => {this.client_id = params.id;});
		this.loadDetails(this.client_id);
	}

	public loadDetails(id: any){
		this.userService.getUserById(id).subscribe(
			success => {
				this.client_info = success;
				console.log(success);
			},
			error => {}
		);
		// this.client_info = info[0];
		// console.log(this.client_info);
	}

	goBack() {
		this.route.navigate(['clients']);
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

    removeUser(userId: any) {
    	this.userService.removeUserById(userId).subscribe(
    		success => {
    			this.notifierService.notify('success', 'Delete successfully !!');
    			this.modalService.dismissAll();
    			this.route.navigateByUrl('clients');
    		},
    		error => {}
    	);
    }

    blockUser(userInfo: any) {
      userInfo.getuser = JSON.parse(localStorage.getItem('user'));
      if(this.blockReason == "0" || this.blockReason == 0) {
        userInfo.block_reason = this.textBlock;
      } else {
        userInfo.block_reason = this.blockReason;
      }
      this.userService.blockUser(userInfo).subscribe(
        success => {
          this.notifierService.notify('success', 'Client blocked !!');
          this.modalService.dismissAll();
          this.loadDetails(this.client_id);
        },
        error => {}
      );
    }

    unblockUser(userInfo: any) {
      userInfo.getuser = JSON.parse(localStorage.getItem('user'));
      this.userService.unblockUser(userInfo).subscribe(
        success => {
          this.notifierService.notify('success', 'Client unblocked !!');
          this.modalService.dismissAll();
          this.loadDetails(this.client_id);
        },
        error => {}
      );
    }


    getDateofBirth(value) {
      return this.datePipe.transform(value, 'dd MMMM yyyy');
    }
}
