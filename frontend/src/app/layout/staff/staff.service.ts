import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpcallService } from '../../shared/services/httpcall.service';
import 'rxjs/add/operator/map';

@Injectable()
export class StaffService {

    //const API_URL = environment.apiUrl;
    baseUrl: string;
    currentUserId = JSON.parse(localStorage.getItem('user')).id;

  constructor(
      private _http: HttpClient,
      private httpService: HttpcallService,
    ) { 
        this.baseUrl = this.httpService.getBaseUrl();
    }

    getList() {
        return this._http.post(`${this.baseUrl}/user/staff/list-user`, {id : this.currentUserId});
    }

    findById(id) {
        return this._http.post(`${this.baseUrl}/user/staff/show_user`,{id : id});
    }

    add(staff) {
        staff.ownerId = this.currentUserId;
        return this._http.post(`${this.baseUrl}/user/staff/create_user`, staff);
    }

    update(staff) {
        staff.ownerId = this.currentUserId;
        return this._http.post(`${this.baseUrl}/user/staff/update_user`, staff);
    }

    deleteStaff(id) {
        return this._http.post(`${this.baseUrl}/user/staff/delete_user`, {'id': id});
    }


    // closed date
    getListClosedDate() {
        return this._http.post(`${this.baseUrl}/user/closed_date/list-close-date`, {ownerId : this.currentUserId});
    }

    findClosedDateById(id: string) {
        return this._http.post(`${this.baseUrl}/user/closed_date/show-close-date`, {id: id});
    }

    deleteClosedDateById(id: string) {
        return this._http.post(`${this.baseUrl}/user/closed_date/delete-close-date`, {id: id});
    }

    addClosedDate(closedDate) {
        closedDate.ownerId = this.currentUserId;
        return this._http.post(`${this.baseUrl}/user/closed_date/create-close-date`, closedDate);
    }

    updateClosedDate(closedDate) {
        closedDate.ownerId = this.currentUserId;
        return this._http.post(`${this.baseUrl}/user/closed_date/update-close-date`, closedDate);
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
