import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import * as firebase from 'firebase/app';
import { Store } from 'src/app/interfaces/store';
import { Product } from 'src/app/interfaces/products';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private storeCollection: AngularFirestoreCollection<Store>;

  constructor(private afs: AngularFirestore) {
    this.storeCollection = this.afs.collection<Store>('stores');
  }

  getStore(id: string): Observable<Store> {
    return this.storeCollection.doc<Store>(id).valueChanges();
  }

  async saveStore(store: Store): Promise<Store> {
    const { idUser } = store;
    await this.storeCollection.doc(idUser).set(store);
    return store;
  }

  getAllStores(): Observable<Array<Store>> {
    return this.storeCollection.valueChanges();
  }

  async saveProduct(idStore: string, product: Product): Promise<Product> {
    await this.storeCollection.doc(idStore).update({
      products: firebase.firestore.FieldValue.arrayUnion(product)
    });
    return product;
  }
}