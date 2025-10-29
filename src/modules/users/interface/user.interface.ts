export interface IJWTPayload {
  id: string;
  email: string;
  role?: string;
}

export interface ICreateUser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone?: string;
  avatar_url?: string;
  role?: string;
}

export interface IUpdateUser {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  avatar_url?: string;
  role?: string;
  status?: boolean;
  lastLoginAt?: Date;
}

export interface IUserResponse {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  avatar_url?: string;
  role?: {
    id: string;
    name: string;
    permissions: string[];
  };
  password_hash: string;
  isActive?: boolean;
  created_at?: Date;
  updated_at?: Date;
}
