import axios from "axios";
import type {
  AccessTokenPayload,
  LoginUserInput,
  RegisterUserInput,
  User,
} from "../types/user";
import type { ApiResponse } from "../../../types/apiResponse";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_BASE_URL}:${import.meta.env.VITE_BACKEND_PORT}/api/v1`,
  withCredentials: true,
});

export async function register(
  data: RegisterUserInput,
): Promise<ApiResponse<User>> {
  const response = await api.post<ApiResponse<User>>("/auth/register", data);
  return response.data;
}

export async function login(data: LoginUserInput): Promise<ApiResponse<null>> {
  const response = await api.post<ApiResponse<null>>("/auth/login", data);
  return response.data;
}

export async function fetchUser(): Promise<ApiResponse<AccessTokenPayload>> {
  const response = await api.get<ApiResponse<AccessTokenPayload>>("/user/me");
  return response.data;
}
