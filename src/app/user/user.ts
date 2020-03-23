import { Role } from '../shared/role';

export interface User {
  displayName: string,
  photoURL?: string,
  roles: Set<Role>,
  selectedRole: string;
}
