import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormStorePageRoutingModule } from './form-store-routing.module';

import { FormStorePage } from './form-store.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormStorePageRoutingModule
  ],
  declarations: [FormStorePage]
})
export class FormStorePageModule {}
