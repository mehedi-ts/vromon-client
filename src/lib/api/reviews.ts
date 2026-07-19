import { apiClient } from '../apiClient';
import { Review } from '../schemas';

export interface ReviewsResponse {
  success: boolean;
  data: Review[];
}

export async function getReviews(packageId: string): Promise<ReviewsResponse> {
  return apiClient<ReviewsResponse>(`/api/reviews/${packageId}`);
}
