export type UserRole = 'admin' | 'player' | 'singer';

export class User {
  id: number;
  username: string;
  password: string; // TODO: hash
  instrument: string;
  role: UserRole;
}
