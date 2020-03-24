import { Injectable } from "@angular/core";
import { Plugins } from "@capacitor/core";
import { User } from 'src/app/user/user';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private static ERROR_TEXT: string = 'DataStorageServiceError'

  async saveUser(user: User): Promise<User> {
    try {
      await Storage.set({
        key: 'user',
        value: JSON.stringify(user),
      });
      return user;
    } catch(err) {
      console.error(`${DataStorageService.ERROR_TEXT}/saveUser: ${err}`);
    }
  }

  async getUser(): Promise<User> {
    try {
      const data = await Storage.get({ key: 'user' });
      const user = JSON.parse(data.value);
      return user as User;
    } catch(err) {
      console.error(`${DataStorageService.ERROR_TEXT}/getUser: ${err}`);
    }
  }

  async setTextsApplication(texts: string): Promise<void> {
    try {
      await Storage.set({ key: 'texts', value: texts });
    } catch(err) {
      console.error(`${DataStorageService.ERROR_TEXT}/setTextsApplication: ${err}`);
    }
  }

  async getTextsApplication(): Promise<any> {
    try {
      const data = await Storage.get({ key: 'texts' });
      const texts = JSON.parse(data.value);
      return texts;
    } catch(err) {
      console.error(`${DataStorageService.ERROR_TEXT}/setTextsApplication: ${err}`);
    }
  }
}