import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StorePage } from './store.page';
import { OptionsPopover } from '../options-popover/options-popover';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: StorePage }])
  ],
  declarations: [StorePage]
})
export class StorePageModule {}
