// src/services/authService.ts
import axios from "../api/axios";
import {
  LoginDto,
  UserRegistrationDto,
  JwtResponseDto,
  UserResponseDto,
  ApiResponse,
} from "@/types/banking";

export const loginApi = async (
  credentials: LoginDto
): Promise<ApiResponse<JwtResponseDto>> => {
  const { data } = await axios.post("/api/auth/login", credentials);
  return data.data;
};

export const registerApi = async (
  userData: UserRegistrationDto
): Promise<ApiResponse<UserResponseDto>> => {
  const { data } = await axios.post("/api/auth/register", userData, {
    withCredentials: true,
  });
  return data;
};

export const getCurrentUser = async (): Promise<UserResponseDto> => {
  const { data } = await axios.get("/api/auth/me", { withCredentials: true });
  return data.data;
};

export const logoutApi = async (): Promise<void> => {
  await axios.post("/api/auth/logout");
};
