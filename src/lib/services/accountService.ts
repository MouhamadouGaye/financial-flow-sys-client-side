import api from "../api/axios.ts"; // Axios instance
import { ApiResponse } from "@/types/banking";
import { AccountDto, CreateAccountDto } from "@/types/banking";

// Create a new account
export const createAccount = async (
  data: CreateAccountDto
): Promise<ApiResponse<AccountDto>> => {
  const response = await api.post<ApiResponse<AccountDto>>(
    "/api/accounts",
    data
  );
  return response.data;
};

// Get account by ID
export const getAccountById = async (
  id: number
): Promise<ApiResponse<AccountDto>> => {
  const response = await api.get<ApiResponse<AccountDto>>(
    `/api/accounts/${id}`
  );
  return response.data;
};

// Get account by account number (ADMIN only)
export const getAccountByNumber = async (
  accountNumber: string
): Promise<ApiResponse<AccountDto>> => {
  const response = await api.get<ApiResponse<AccountDto>>(
    `/api/accounts/number/${accountNumber}`
  );
  return response.data;
};

// Get all accounts for a specific user (ADMIN or owner)
export const getAccountsByUserId = async (
  userId: number
): Promise<ApiResponse<AccountDto[]>> => {
  const response = await api.get<ApiResponse<AccountDto[]>>(
    `/api/accounts/user/${userId}`
  );
  return response.data;
};

// Get all accounts for the currently authenticated user
export const getMyAccounts = async (): Promise<ApiResponse<AccountDto[]>> => {
  const response = await api.get<ApiResponse<AccountDto[]>>(
    `/api/accounts/my-accounts`
  );
  return response.data;
};

// Freeze an account (ADMIN only)
export const freezeAccount = async (
  accountId: number
): Promise<ApiResponse<string | null>> => {
  const response = await api.put<ApiResponse<string | null>>(
    `/api/accounts/${accountId}/freeze`
  );
  return response.data;
};

// Unfreeze an account (ADMIN only)
export const unfreezeAccount = async (
  accountId: number
): Promise<ApiResponse<string | null>> => {
  const response = await api.put<ApiResponse<string | null>>(
    `/api/accounts/${accountId}/unfreeze`
  );
  return response.data;
};
