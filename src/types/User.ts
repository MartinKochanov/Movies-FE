export type LoginCredentials = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export type RegisterCredentials = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl?: string;
  role: UserRole;
};

export enum UserRole {
  Client,
  ADMIN,
  SUPER_ADMIN,
}
