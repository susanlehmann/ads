import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { Brand } from './model/brand';
import { BrandService } from './brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {
  loading: boolean;
  form: Brand;
  public error = [];
  closeResult: string;
  listbrands: Brand[];
  isCreate: boolean;
  selectedId: string;

  //brands = [{name: 'killua',productassigned: '1',updatetime: '25 Jan 2019, 13:52'},{name: 'kim',productassigned: '2',updatetime: '26 Jan 2019, 13:52'}]
  constructor(private notifierService: NotifierService,
    private modal: NgbModal,
    private BrandService: BrandService,
  ) {
    this.form = new Brand();
  }

  openModal(content: NgbModalRef) {
    this.modal.open(content).result.then((result) => {
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

  openUpdateModal(content: NgbModalRef, brandID) {
    this.isCreate = false;
    this.selectedId = brandID;
    this.BrandService.findById(brandID)
    .subscribe((data:any) => {
            this.form.updateData(data.brand);
            this.openModal(content);
        });
  }

  getBrand() {
    this.startLoading();
    this.BrandService.getList()
		.subscribe((listbrands:any) => {
        this.stopLoading();
         this.listbrands = listbrands.brand
         .map(Brand.toModel)
         .sort((a, b) => {
           return a.id - b.id;
         });
		}, err => {
      this.stopLoading();
    });
	}


  onSubmit(): void {
    const dto = this.form.toDto();
    this.startLoading();
    if (this.isCreate) {
      this.addBrand(dto);
    } else {
      this.updateBrand(dto);
    }
    this.modal.dismissAll();
  }

  addBrand(Brand): void {
    this.BrandService.add(Brand)
    .subscribe((data:any) => {
            this.stopLoading();
            this.getBrand();
            this.notifierService.notify('success', 'A new Brand has been successfully added');
    }), err => {
      this.stopLoading();
    };
    }

  updateBrand(Brand) {
    this.BrandService.update(Brand)
    .subscribe((data:any) => {
            this.stopLoading();
            this.getBrand();
            this.notifierService.notify('success', 'Brand information has been successfully updated');
    }), err => {
      this.stopLoading();
    };
    }

  deleteBrand() {
      this.BrandService.deletebrand(this.selectedId)
      .subscribe((data:any) => {
              this.getBrand();
              this.notifierService.notify('success', 'A Brand has been successfully deleted');
          });
    this.modal.dismissAll();
  }


  //private getDismissReason(reason: any): string {
  //  if (reason === ModalDismissReasons.ESC) {
  //    return 'by pressing ESC';
  //  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //    return 'by clicking on a backdrop';
  //  } else {
  //    return  `with: ${reason}`;
  //  }
  //}
  startLoading(): void {
    this.loading = true;
  }

  stopLoading(): void {
    this.loading = false;
  }

  ngOnInit() {
    this.getBrand();
  }

}
