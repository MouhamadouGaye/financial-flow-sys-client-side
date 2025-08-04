import api from "../api/axios";
import { ApiResponse, UserResponseDto, AuditLog } from "@/types/banking";
import { Page } from "../../types/pagination";

// === User Management ===

// Get all users (ADMIN)
export const getAllUsers = async (): Promise<
  ApiResponse<UserResponseDto[]>
> => {
  const res = await api.get<ApiResponse<UserResponseDto[]>>("/api/admin/users");
  return res.data;
};

// Get a user by ID (ADMIN)
export const getUserById = async (
  id: number
): Promise<ApiResponse<UserResponseDto>> => {
  const res = await api.get<ApiResponse<UserResponseDto>>(
    `/api/admin/users/${id}`
  );
  return res.data;
};

// Lock a user account for X hours (ADMIN)
export const lockUser = async (
  id: number,
  hours = 24
): Promise<ApiResponse<string | null>> => {
  const res = await api.put<ApiResponse<string | null>>(
    `/api/admin/users/${id}/lock?hours=${hours}`
  );
  return res.data;
};

// Unlock a user account (ADMIN)
export const unlockUser = async (
  id: number
): Promise<ApiResponse<string | null>> => {
  const res = await api.put<ApiResponse<string | null>>(
    `/api/admin/users/${id}/unlock`
  );
  return res.data;
};

// === Account Management ===

// Update account balance (ADMIN)
export const updateAccountBalance = async (
  id: number,
  newBalance: number
): Promise<ApiResponse<string | null>> => {
  const res = await api.put<ApiResponse<string | null>>(
    `/api/admin/accounts/${id}/balance?newBalance=${newBalance}`
  );
  return res.data;
};

// === Audit Log Management ===

// Get audit logs with filters (ADMIN)
export const getAuditLogs = async (params?: {
  startDate?: string;
  endDate?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDir?: "asc" | "desc";
}): Promise<ApiResponse<Page<AuditLog>>> => {
  const res = await api.get<ApiResponse<Page<AuditLog>>>(
    `/api/admin/audit-logs`,
    {
      params,
    }
  );
  return res.data;
};
