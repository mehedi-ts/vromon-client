import { apiClient } from '../apiClient';
import { Package } from '../schemas';

export interface ActionResponse {
  success: boolean;
  message?: string;
  data?: any;
}

export async function createPackage(data: Omit<Package, '_id' | 'ownerId' | 'createdAt'>): Promise<ActionResponse> {
  return apiClient<ActionResponse>('/api/packages', {
    method: 'POST',
    body: JSON.stringify(data),
    requireAuth: true,
  });
}

export async function deletePackage(id: string): Promise<ActionResponse> {
  return apiClient<ActionResponse>(`/api/packages/${id}`, {
    method: 'DELETE',
    requireAuth: true,
  });
}
