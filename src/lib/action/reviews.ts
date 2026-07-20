'use server';

import { apiClientServer } from '../apiClient.server';
import { Review } from '../schemas';
import { ActionResponse } from './packages';

export async function addReview(data: Omit<Review, '_id' | 'createdAt' | 'userId'>): Promise<ActionResponse & { newAverage?: number }> {
  return apiClientServer<ActionResponse & { newAverage?: number }>('/api/reviews', {
    method: 'POST',
    body: JSON.stringify(data),
    requireAuth: true,
  });
}
