'use server';

import { apiClientServer } from '../apiClient.server';
import { Package } from '../schemas';

export interface ActionResponse {
  success: boolean;
  message?: string;
  data?: any;
}

export async function createPackage(data: Omit<Package, '_id' | 'ownerId' | 'createdAt'>): Promise<ActionResponse> {
  try {
    return await apiClientServer<ActionResponse>('/api/packages', {
      method: 'POST',
      body: JSON.stringify(data),
      requireAuth: true,
    });
  } catch (error: any) {
    return { success: false, message: error.message || 'Failed to create package' };
  }
}

export async function deletePackage(id: string): Promise<ActionResponse> {
  try {
    return await apiClientServer<ActionResponse>(`/api/packages/${id}`, {
      method: 'DELETE',
      requireAuth: true,
    });
  } catch (error: any) {
    return { success: false, message: error.message || 'Failed to delete package' };
  }
}
