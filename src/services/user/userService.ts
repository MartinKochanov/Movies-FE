import type { LoginCredentials, LoginResponse, RegisterCredentials } from "../../types/User";
import instance from "../config/axiosConfig";
import { userEndpoints } from "./userEndpoints";

export const login = async (credentials: LoginCredentials) => {
  const { data } = await instance.post<LoginResponse>(userEndpoints.login(), credentials);
  return data;
};

export const register = async (credentials: RegisterCredentials) => {
  await instance.post<void>(userEndpoints.register(), credentials);
};
