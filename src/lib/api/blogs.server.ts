import { apiClientServer } from '../apiClient.server';
import { BlogsResponse, SingleBlogResponse } from './blogs';

export async function getBlogsServer(page = 1, limit = 10): Promise<BlogsResponse> {
  return apiClientServer<BlogsResponse>(`/api/blogs?page=${page}&limit=${limit}`);
}

export async function getBlogByIdServer(id: string): Promise<SingleBlogResponse> {
  return apiClientServer<SingleBlogResponse>(`/api/blogs/${id}`);
}
