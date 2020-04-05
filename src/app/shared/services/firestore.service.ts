import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import * as firebase from 'firebase';
import { Store } from 'src/app/interfaces/store';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private storeCollection: AngularFirestoreCollection<Store>;

  constructor(private afs: AngularFirestore) {
    this.storeCollection = afs.collection<Store>('stores');
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
}