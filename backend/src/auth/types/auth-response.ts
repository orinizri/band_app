export interface AuthResponse {
  user: {
    username: string;
    instrument: string;
    role: 'player' | 'singer' | 'admin';
  } | null;
  token: string | null;
  error?: string | null;
}
