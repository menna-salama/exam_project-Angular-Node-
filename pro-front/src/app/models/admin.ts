export interface Admin {
  _id: string;
  email: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  status?: string;
  data?:
    | {
        token?: string;
      }
    | string;
  token?: string;
  accessToken?: string;
}
