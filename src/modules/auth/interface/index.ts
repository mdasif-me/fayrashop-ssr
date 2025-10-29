export interface ITokenPayload {
  sub: string;
  email: string;
  role?: string;
}

export interface IAuthResponse {
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    role?: {
      id: string;
      name: string;
      permissions: string[];
    };
  };
  accessToken: string;
  refreshToken: string;
}
