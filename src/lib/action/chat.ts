import { apiClient } from '../apiClient';

export async function sendChatMessageStream(message: string, packageId?: string): Promise<Response> {
  return apiClient<Response>('/api/chat/message', {
    method: 'POST',
    body: JSON.stringify({ message, packageId }),
    requireAuth: true,
    rawResponse: true,
  });
}