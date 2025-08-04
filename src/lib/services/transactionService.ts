// src/services/transactionService.ts
import api from "../api/axios";
import { ApiResponse } from "../../types/banking";
import { TransactionDto } from "../../types/banking";
import { Page } from "../../types/pagination";

// === DTOs for input ===
export interface DepositDto {
  accountId: number;
  amount: number;
  description: string;
}

export interface WithdrawalDto {
  accountId: number;
  amount: number;
  description: string;
}

// === Deposit ===
export const deposit = async (
  data: DepositDto
): Promise<ApiResponse<TransactionDto>> => {
  const res = await api.post<ApiResponse<TransactionDto>>(
    "/api/transactions/deposit",
    data
  );
  return res.data;
};

// === Withdraw ===
export const withdraw = async (
  data: WithdrawalDto
): Promise<ApiResponse<TransactionDto>> => {
  const res = await api.post<ApiResponse<TransactionDto>>(
    "/api/transactions/withdraw",
    data
  );
  return res.data;
};

// === Get transaction by ID ===
export const getTransactionById = async (
  id: number
): Promise<ApiResponse<TransactionDto>> => {
  const res = await api.get<ApiResponse<TransactionDto>>(
    `/api/transactions/${id}`
  );
  return res.data;
};

// === Get transaction by reference ===
export const getTransactionByReference = async (
  reference: string
): Promise<ApiResponse<TransactionDto>> => {
  const res = await api.get<ApiResponse<TransactionDto>>(
    `/api/transactions/reference/${reference}`
  );
  return res.data;
};

// === Get transactions for a specific account (paginated) ===
export const getAccountTransactions = async (
  accountId: number,
  page = 0,
  size = 20,
  sortBy = "createdAt",
  sortDir: "asc" | "desc" = "desc"
): Promise<ApiResponse<Page<TransactionDto>>> => {
  const res = await api.get<ApiResponse<Page<TransactionDto>>>(
    `/api/transactions/account/${accountId}`,
    {
      params: { page, size, sortBy, sortDir },
    }
  );
  return res.data;
};

// === Get transactions for the current user (paginated) ===
export const getMyTransactions = async (
  page = 0,
  size = 20
): Promise<ApiResponse<Page<TransactionDto>>> => {
  const res = await api.get<ApiResponse<Page<TransactionDto>>>(
    `/api/transactions/my-transactions`,
    {
      params: { page, size },
    }
  );
  return res.data;
};

// === Get transactions by date range for an account ===
export const getTransactionsByDateRange = async (
  accountId: number,
  startDate: string, // ISO string
  endDate: string // ISO string
): Promise<ApiResponse<TransactionDto[]>> => {
  const res = await api.get<ApiResponse<TransactionDto[]>>(
    `/api/transactions/account/${accountId}/date-range`,
    {
      params: { startDate, endDate },
    }
  );
  return res.data;
};
