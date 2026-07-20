'use server';

import { apiClientServer } from '../apiClient.server';
import { Package } from '../schemas';

export interface ActionResponse {
  success: boolean;
  message?: string;
  data?: any;
}

export async function createPackage(data: Omit<Package, '_id' | 'ownerId' | 'createdAt'>): Promise<ActionResponse> {
  return apiClientServer<ActionResponse>('/api/packages', {
    method: 'POST',
    body: JSON.stringify(data),
    requireAuth: true,
  });
}

export async function deletePackage(id: string): Promise<ActionResponse> {
  return apiClientServer<ActionResponse>(`/api/packages/${id}`, {
    method: 'DELETE',
    requireAuth: true,
  });
}
