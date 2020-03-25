import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/firestore";

import * as firebase from 'firebase/app';
import { User } from './user';
import { Role } from 'src/app/shared/enums';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersCollection: AngularFirestoreCollection<User>;

  constructor(
    private afs: AngularFirestore,
    private dataStorage: DataStorageService
  ) {
    this.usersCollection = afs.collection<User>('users');

  }

  async saveUser(user: firebase.User, provider: string): Promise<User> {
    const { uid, displayName, photoURL } = user;
    const newUser: User = {
      uid,
      displayName,
      photoURL,
      roles: [Role.Customer],
      selectedRole: Role.Customer,
      provider,
    }
    await this.usersCollection.doc(uid).set(newUser);
    await this.dataStorage.saveUser(newUser);
    return newUser;
  }

  getUser(uid: string): Observable<User> {
   return this.afs.doc<User>(`users/${uid}`).valueChanges();
  }
}