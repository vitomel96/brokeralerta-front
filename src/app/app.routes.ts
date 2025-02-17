import { Routes } from '@angular/router';
import { DefaultComponent } from './UI/layouts/default/default.component';
import { HomeComponent } from './UI/views/home/home.component';
import { BrokerListComponent } from './UI/shared/components/broker-list/broker-list.component';

export const routes: Routes = [
  {
    path: "",
    component: DefaultComponent,
    children: [
  {    path: "",
      component: HomeComponent},
      {
        path: "brokers",
        component: BrokerListComponent
      }
    ]
  },
];
