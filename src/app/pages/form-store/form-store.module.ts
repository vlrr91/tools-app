import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormStorePageRoutingModule } from './form-store-routing.module';

import { FormStorePage } from './form-store.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormStorePageRoutingModule
  ],
  declarations: [FormStorePage]
})
export class FormStorePageModule {}
