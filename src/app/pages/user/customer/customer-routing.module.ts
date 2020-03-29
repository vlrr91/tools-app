import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CustomerPage } from './customer.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: CustomerPage,
    children: [
      {
        path: 'map',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./map-tab/map.tab.module').then(m => m.MapTabModule)
          }
        ]
      },
      {
        path: 'chat',
        children: [
          {
            path: '',
            loadChildren: () => 
              import('./chat-tab/chat-tab.module').then(m => m.MapTabModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/customer/tabs/map',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/customer/tabs/map',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerPageRoutingModule { }
