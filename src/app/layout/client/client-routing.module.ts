import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './client.component';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { AddComponent } from './add/add.component';

const routes: Routes = [{
 path: '', component: ClientComponent, children: [
  { path: '', component: ListComponent },
  { path: 'detail/:id', component: DetailComponent, data: {title: 'Clients > Profile'}},
  { path: 'edit/:id', component: EditComponent,data: {title: 'Clients'} },
  { path: 'add', component: AddComponent,data: {title: 'Clients'} }
 ],data: {title: 'Clients'}
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
