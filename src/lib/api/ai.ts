import { apiClient } from '../apiClient';

export interface AIGenerateResponse {
  success: boolean;
  message?: string;
  data: string;
}

export async function generateBlogContent(title: string, length: 'short' | 'medium' | 'long'): Promise<AIGenerateResponse> {
  return apiClient<AIGenerateResponse>('/api/ai/generate', {
    method: 'POST',
    body: JSON.stringify({ title, length }),
    requireAuth: true
  });
}
