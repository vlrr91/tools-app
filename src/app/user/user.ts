import { Role } from '../shared/role';

export interface User {
  uid: string;
  displayName: string,
  photoURL?: string,
  roles: Array<Role>,
  selectedRole: string;
}
