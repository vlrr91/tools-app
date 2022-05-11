import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Geolocation } from "@capacitor/geolocation";

import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { Store } from 'src/app/interfaces/store';
import { User } from 'src/app/interfaces/user';
import { Product } from 'src/app/interfaces/products';
// import { Observable } from 'rxjs';
// import { NitValidatorService } from './nitValidator';

@Component({
  selector: 'app-form-store',
  templateUrl: './form-store.page.html',
  styleUrls: ['./form-store.page.scss'],
})
export class FormStorePage implements OnInit {
  form: FormGroup;
  location: any;
  currentLatitude: number;
  currentLongitude: number;
  store: Store | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private storeService: StoreService,
    private dataStorageService: DataStorageService,
    // private nitValidator: NitValidatorService,
  ) {}

  async ngOnInit() {
    try {
      const store = await this.dataStorageService.getStore();
      if (store) this.store = store;
      this.buildForm();

      const location = await Geolocation.getCurrentPosition();
      const { latitude, longitude } = location.coords;
      this.currentLatitude = this.store?.location[0] as number || latitude;
      this.currentLongitude = this.store?.location[1] as number ||longitude;
    } catch(error) {
      this.currentLatitude = 4.6097102
      this.currentLongitude = -74.081749;
    }
    
  }

  async createStore(): Promise<void> {
    if (this.form.valid) {
      window.dispatchEvent(new CustomEvent('user:ally'));
      const user: User = await this.dataStorageService.getUser();
      const { lat, lng, address } = this.location;
      
      const newStore: Store = {
        idUser: user.uid,
        owner: user.displayName,
        name: this.nameField.value,
        cellPhone: this.cellPhoneField.value ? this.cellPhoneField.value : null,
        localPhone: this.localPhoneField.value ? this.localPhoneField.value : null,
        photoURL: null,
        products: new Array<Product>(),
        location: [lat, lng],
        address,
        nit: this.nitField.value,
      }

      await this.storeService.saveStore(newStore)
      await this.dataStorageService.saveStore(newStore);
      this.navCtrl.navigateRoot('/ally');
    } else {
      this.form.markAllAsTouched();
    }
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      name: [this.store?.name || '', Validators.required],
      nit: [
        this.store?.nit || '',
        [Validators.required, Validators.min(100000), Validators.max(99999999999)],
        // [this.nitValidator.isValidNIT()]
      ],
      cellPhone: [this.store?.cellPhone || ''],
      localPhone: [this.store?.localPhone || '']
    });
  }

  get nameField(): AbstractControl {
    return this.form.get('name');
  }

  get nitField(): AbstractControl {
    return this.form.get('nit');
  }

  get cellPhoneField(): AbstractControl {
    return this.form.get('cellPhone');
  }

  get localPhoneField(): AbstractControl {
    return this.form.get('localPhone');
  }

  getLocation(location: any) {
    this.location = location;
  }
}
