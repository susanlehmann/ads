import { Component, OnInit } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { Category } from './model/category';
import { CategoryService } from './category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  //categories = [{name: 'Hair product',productassigned: '1'},{name: 'Da product',productassigned: '2'}]
  loading: boolean;
  form: Category;
  public error = [];
  closeResult: string;
  listcategories: Category[];
  isCreate: boolean;
  selectedId: string;

  constructor(private notifierService: NotifierService,
    private modal: NgbModal,
    private CategoryService: CategoryService,
  ) {
    this.form = new Category();
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

  openUpdateModal(content: NgbModalRef, categoryID) {
    this.isCreate = false;
    this.selectedId = categoryID;
    this.CategoryService.findById(categoryID)
    .subscribe((data:any) => {
            this.form.updateData(data.category);
            this.openModal(content);
        });
  }

  getCategory() {
    this.startLoading();
    this.CategoryService.getList()
		.subscribe((listcategories:any) => {
        this.stopLoading();
         this.listcategories = listcategories.category
         .map(Category.toModel)
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
      this.addCategory(dto);
    } else {
      this.updateCategory(dto);
    }
    this.modal.dismissAll();
  }

  addCategory(Category): void {
    this.CategoryService.add(Category)
    .subscribe((data:any) => {
            this.stopLoading();
            this.getCategory();
            this.notifierService.notify('success', 'A new Category has been successfully added');
    }), err => {
      this.stopLoading();
    };
    }

  updateCategory(Category) {
    this.CategoryService.update(Category)
    .subscribe((data:any) => {
            this.stopLoading();
            this.getCategory();
            this.notifierService.notify('success', 'Category information has been successfully updated');
    }), err => {
      this.stopLoading();
    };
    }

  deleteCategory() {
      this.CategoryService.deletecategory(this.selectedId)
      .subscribe((data:any) => {
              this.getCategory();
              this.notifierService.notify('success', 'A Category has been successfully deleted');
          });
    this.modal.dismissAll();
  }

  searchCategory(search) {
    const query = {name_category: event.target.value};
    this.CategoryService.searchCategory(search).subscribe((listcategories: any) => {
      this.categories = listcategories .map(Category.toModel);
    });
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
    this.getCategory();
  }
}
