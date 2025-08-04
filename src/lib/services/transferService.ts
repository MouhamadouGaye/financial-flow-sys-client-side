import api from "../api/axios";
import { ApiResponse, TransactionDto } from "../../types/banking";

// === Transfer DTO ===
export interface TransferDto {
  sourceAccountId: number;
  destinationAccountId: number;
  amount: number;
  description: string;
}

// === Perform a transfer ===
export const transfer = async (
  data: TransferDto
): Promise<ApiResponse<TransactionDto>> => {
  const res = await api.post<ApiResponse<TransactionDto>>(
    "/api/transfers",
    data
  );
  return res.data;
};
