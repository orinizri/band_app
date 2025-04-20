export interface AuthResponse {
  user: {
    id: string;
    username: string;
    instrument: string;
    role: 'player' | 'singer' | 'admin';
  } | null;
  token: string | null;
  error?: string | null;
}
