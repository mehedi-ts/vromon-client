import { apiClient } from '../apiClient';

export interface ChatSession {
  _id?: string;
  userId: string;
  userMessage: string;
  assistantMessage: string;
  contextPackageId?: string;
  createdAt?: string;
}

export interface ChatHistoryResponse {
  success: boolean;
  data: ChatSession[];
}

export async function getChatHistory(): Promise<ChatHistoryResponse> {
  return apiClient<ChatHistoryResponse>('/api/chat/history', { requireAuth: true });
}