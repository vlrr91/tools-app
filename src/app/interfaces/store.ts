import * as firebase from 'firebase';
import { Product } from './products';

export interface Store {
  idUser: string;
  name: string;
  location: firebase.firestore.GeoPoint;
  cellPhone?: string;
  localPhone?: string;
  photoURL?: string;
  products: Array<Product>;
}