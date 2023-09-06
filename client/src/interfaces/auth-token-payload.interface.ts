export interface IAuthTokenPayload {
  expiresIn: number;
  accessToken: string;
  refreshToken: string;
}
