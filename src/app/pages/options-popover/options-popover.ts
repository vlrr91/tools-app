import { Component } from "@angular/core";
import { PopoverController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { Role } from 'src/app/interfaces/enums';
import { User } from 'src/app/interfaces/user';

@Component({
  template: `
  <ion-list>
      <ion-item button (click)="changeRole()">
        <ion-label>Cambia a aliado</ion-label>
      </ion-item>
      <ion-item button (click)="logOut()">
        <ion-label>Cerrar sesión</ion-label>
      </ion-item>
    </ion-list>
  `
})
export class OptionsPopover {
  constructor(
    private popoverCtrl: PopoverController,
    private authService: AuthService,
    private dataStorageService: DataStorageService,
    private navCtrl: NavController
  ) {}

  async changeRole(): Promise<void> {
    const user = await this.dataStorageService.getUser();
   
    if (user.selectedRole === Role.Ally) {
      const updatedUser: User = {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        roles: user.roles,
        selectedRole: Role.Customer,
        provider: user.provider
      }
      await this.dataStorageService.saveUser(updatedUser);
      this.navCtrl.navigateRoot(`${Role.Customer}`);
    }

    if (user.selectedRole === Role.Customer) {
      const updatedUser: User = {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        roles: user.roles,
        selectedRole: Role.Ally,
        provider: user.provider
      }
      await this.dataStorageService.saveUser(updatedUser);
      this.navCtrl.navigateRoot(`${Role.Ally}`);
    }
    await this.popoverCtrl.dismiss();
  }

  logOut(): void {
    this.authService.logout();
    this.popoverCtrl.dismiss();
  }
}