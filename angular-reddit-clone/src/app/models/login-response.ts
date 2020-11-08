export interface LoginResponse {
  authenticationToken: string;
  username: string;
  expiresAt: Date;
  refreshToken: string;
}
