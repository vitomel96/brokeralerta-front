import { Routes } from '@angular/router';
import { DefaultComponent } from './UI/layouts/default/default.component';
import { HomeComponent } from './UI/views/home/home.component';
import { BrokerDetailComponent } from './UI/views/broker-detail/broker-detail.component';
import { BrokerListComponent } from './UI/views/broker-list/broker-list.component';
import { AdminBrokersComponent } from './UI/views/admin-brokers/admin-brokers.component';
import { AdminUsersComponent } from './UI/views/admin-users/admin-users.component';

export const routes: Routes = [
  {
    path: "",
    component: DefaultComponent,
    children: [
      { path: "", component: HomeComponent },
      { path: "brokers", component: BrokerListComponent },
      { path: "brokers/:name", component: BrokerDetailComponent },
      { path: "brokers-admin", component: AdminBrokersComponent },
      { path: "users-admin", component: AdminUsersComponent },
    ]
  },
  { path: '', redirectTo: '', pathMatch: 'full' }
];
