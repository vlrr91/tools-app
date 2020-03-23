import { Injectable } from "@angular/core";
import { Platform, NavController  } from "@ionic/angular";
import { AngularFireAuth } from '@angular/fire/auth';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { DataStorageService } from './data-storage.service';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>;
  private static TAG: string = "AuthServiceError";
  errorMessage: string;

  constructor(
    private platform: Platform,
    private afAuth: AngularFireAuth,
    private gPlus: GooglePlus,
    private facebook: Facebook,
    private navCtrl: NavController,
    private dataStorageService: DataStorageService
  ) {
    this.user = this.afAuth.authState;
  }

  googleLogin(): void {
    if (this.platform.is('hybrid')) {
      this.nativeGoogleLogin();
    } else {
      this.webGoogleLogin();
    }
  }

  async nativeGoogleLogin(): Promise<void> {
    try {
      const gPlusUser = await this.gPlus.login({
        'webClientId': environment.clientWebGoogleID,
        'offline': true,
        'scopes': 'profile email'
      });
      const firebaseUser = await this.afAuth.auth.signInWithCredential(
        firebase.auth.GoogleAuthProvider.credential(gPlusUser.idToken)
      );
      const user = await this.dataStorageService.saveUser(firebaseUser.user);
      this.navCtrl.navigateRoot(`${user.selectedRole}`);
    } catch(err) {
      console.error(`${AuthService.TAG}/nativeGoogleLogin: ${err}`);
    }
  }

  async webGoogleLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const firebaseUser = await this.afAuth.auth.signInWithPopup(provider);
      const user = await this.dataStorageService.saveUser(firebaseUser.user);
      this.navCtrl.navigateRoot(`${user.selectedRole}`);
    } catch(err) {
      console.error(`${AuthService.TAG}/webGoogleLogin: ${err}`);
    }
  }

  facebookLogin(): void {
    if (this.platform.is('hybrid')) {
      this.nativeFacebookLogin();
    } else {
      this.webFacebookLogin();
    }
  }

  async nativeFacebookLogin() {
    try {
      const facebookUser = await this.facebook.login(['public_profile', 'email']);
      const firebaseUser = await this.afAuth.auth.signInWithCredential(
        firebase.auth.FacebookAuthProvider.credential(facebookUser.authResponse.accessToken)
      );
      const user = await this.dataStorageService.saveUser(firebaseUser.user);
      this.navCtrl.navigateRoot(`${user.selectedRole}`);
    } catch(err) {
      console.error(`${AuthService.TAG}/nativeFacebookLogin: ${err}`);
    }
  }

  async webFacebookLogin() {
    try {
      const provider = new firebase.auth.FacebookAuthProvider();
      const firebaseUser = await this.afAuth.auth.signInWithPopup(provider);
      const user = await this.dataStorageService.saveUser(firebaseUser.user);
      this.navCtrl.navigateRoot(`${user.selectedRole}`);
    } catch(err) {
      console.error(`${AuthService.TAG}/webFacebookLogin: ${err}`);
    }
  }

  async emailAndPasswordLogin(email: string, password: string) {
    try {
      const firebaseUser = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      const user = await this.dataStorageService.saveUser(firebaseUser.user);
      this.navCtrl.navigateRoot(`${user.selectedRole}`);
    } catch(err) {
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        const texts = await this.dataStorageService.getTextsApplication();
        this.errorMessage = texts.formMessages.userOrPassInvalid;
      } else if (err.code === 'auth/too-many-requests') {
        const texts = await this.dataStorageService.getTextsApplication();
        this.errorMessage = texts.formMessages.manyRequest;
      } else {
        console.error(`${AuthService.TAG}/emailAndPasswordLogin: ${err}`);
      }
    }
  }

  async createUser(firstName: string, lastName: string, email: string, pass: string) {
    try {
      await this.afAuth.auth.createUserWithEmailAndPassword(email, pass);
      const subscription = this.user.subscribe(async firebaseUser => {
        if (firebaseUser) {
          const displayName = `${firstName.toLowerCase().trim()} ${lastName.toLowerCase().trim()}`;
          firebaseUser.updateProfile({ displayName  });
          const user = await this.dataStorageService.saveUser({ displayName } as firebase.User);
          await firebaseUser.sendEmailVerification();
          subscription.unsubscribe();
          this.navCtrl.navigateRoot(`/${user.selectedRole}`);
        } else {
          console.error(`${AuthService.TAG}, updating user`);
          subscription.unsubscribe();
        }
      });
    } catch(err) {
      if (err.code === 'auth/email-already-in-use') {
        const texts = await this.dataStorageService.getTextsApplication();
        this.errorMessage = texts.formMessages.emailInUse;
      }
      console.error(`${AuthService.TAG}/createUser: ${err}`);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.afAuth.auth.signOut();
    } catch(err) {
      console.error(`${AuthService.TAG}/logout: ${err}`);
    }
  }
}