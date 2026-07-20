'use server';

import { apiClientServer } from '../apiClient.server';
import { Review } from '../schemas';
import { ActionResponse } from './packages';

export async function addReview(data: Omit<Review, '_id' | 'createdAt' | 'userId'>): Promise<ActionResponse & { newAverage?: number }> {
  try {
    return await apiClientServer<ActionResponse & { newAverage?: number }>('/api/reviews', {
      method: 'POST',
      body: JSON.stringify(data),
      requireAuth: true,
    });
  } catch (error: any) {
    return { success: false, message: error.message || 'Failed to add review' };
  }
}
