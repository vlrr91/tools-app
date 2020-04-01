import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { AllyPage } from './ally.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: AllyPage,
    children: [
      {
        path: 'store',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../store/store.module').then(m => m.StorePageModule)
          }
        ]
      },
      {
        path: 'chats',
        children: [
          {
            path: '',
            loadChildren: () => 
              import('../chats/chat-tab.module').then(m => m.ChatTabModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/ally/tabs/store',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/ally/tabs/store',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllyPageRoutingModule { }