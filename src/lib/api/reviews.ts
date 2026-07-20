import { apiClientServer } from '../apiClient.server';
import { Review } from '../schemas';

export interface ReviewsResponse {
  success: boolean;
  data: Review[];
}

export async function getReviews(packageId: string): Promise<ReviewsResponse> {
  return apiClientServer<ReviewsResponse>(`/api/reviews/${packageId}`);
}
