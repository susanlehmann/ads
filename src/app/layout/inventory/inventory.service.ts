import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpcallService } from '../../shared/services/httpcall.service';
import 'rxjs/add/operator/map';

@Injectable()
export class InventoryService {

    baseUrl: string;
    currentUserId = JSON.parse(localStorage.getItem('user')).id;

  constructor(
      private _http: HttpClient,
      private httpService: HttpcallService,
    ) { 
        this.baseUrl = this.httpService.getBaseUrl();
    }

    // Product
    getListProduct() {
        return this._http.post(`${this.baseUrl}/user/inventory/product/list-product`, {id : this.currentUserId});
    }

    findProductById(id) {
        return this._http.post(`${this.baseUrl}/user/inventory/product/show-product`,{id : id});
    }

    addProduct(product) {
        product.ownerId = this.currentUserId;
        return this._http.post(`${this.baseUrl}/user/inventory/product/create-product`, product);
    }

    updateProduct(product) {
        product.ownerId = this.currentUserId;
        return this._http.post(`${this.baseUrl}/user/inventory/product/update-product`, product);
    }

    deleteProduct(id) {
        return this._http.post(`${this.baseUrl}/user/inventory/product/delete-product`, {'id': id});
    }

    searchProduct(query) {
        query.ownerId = this.currentUserId;
        return this._http.post(`${this.baseUrl}/user/inventory/product/search-product`, query);
    }

    getListCategory() {
        return this._http.post(`${this.baseUrl}/user/inventory/category/list-category`, {id : this.currentUserId});
    }

    getListBrand() {
        return this._http.post(`${this.baseUrl}/user/inventory/brand/list-brand`, {id : this.currentUserId});
    }

    getListSupplier() {
        return this._http.post(`${this.baseUrl}/user/inventory/supplier/list-supplier`, {id : this.currentUserId});
    }

    getStockHistory(productId) {
        return this._http.post(`${this.baseUrl}/user/inventory/stock/list-stock`, {id : this.currentUserId, id_product: productId});
    }

    addStockHistory(stock) {
        stock.ownerId = this.currentUserId;
        return this._http.post(`${this.baseUrl}/user/inventory/stock/create-stock`, stock);
    }

  getUsers(){
      return this._http.get('http://task-treking/public/api/users',{
          headers: new HttpHeaders({'Accept': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token'),})
      }).map(result => result);
  }
  getInvoices(){
      return this._http.get('http://task-treking/public/api/invoices').map(result => result);
  }
  getTasks(){
      return this._http.get('http://task-treking/public/api/tasks', {
          headers: new HttpHeaders({'Accept': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token'),})
      }).map(result => result);
  }
  showTask(id: number){
      return this._http.get('http://task-treking/public/api/tasks/'+id+'', {
          headers: new HttpHeaders({'Accept': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token'),})
      }).map(result => result);
  }
  createTask(arr: object){
      return this._http.post('http://task-treking/public/api/tasks', arr, {
          headers: new HttpHeaders({'Accept': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token'),})
      }).map(result => result);
  }
    updateTask(id: number,arr: object){
        return this._http.put('http://task-treking/public/api/tasks/'+id+'', arr, {
            headers: new HttpHeaders({'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),})
        }).map(result => result);
    }
    deleteTask(id:number){
      return this._http.delete('http://task-treking/public/api/tasks/'+id+'', {
          headers: new HttpHeaders({'Accept': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token'),})
      }).map(result => result);
    }
  /*getClients(): Observable<ClientsInterface[]> {
    return this.http.get(this._clientsURL).map((response: Responce) => {
      return <ClientsInterface[]>response.json();
    }).catch(this.handleError);
  }

  private handleError(error: Response) {
      return Observable.throw(error.statusText);
  }
    public getAllClients(): Observable<ClientsInterface[]> {
        return this.http
            .get(this.API_URL)
            .map(response => {
                const todos = response.json();
                return todos.map((todo) => new ClientsInterface(todo));
            })
            .catch(this.handleError);
    }*/

}
