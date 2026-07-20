import { apiClient } from '../apiClient';

export interface Blog {
  _id: string;
  title: string;
  description?: string;
  excerpt?: string;
  authorId: string;
  authorEmail: string;
  createdAt: string;
}

export interface BlogsResponse {
  success: boolean;
  message?: string;
  data: Blog[];
  total?: number;
  page?: number;
  limit?: number;
}

export interface SingleBlogResponse {
  success: boolean;
  message?: string;
  data: Blog;
}

export async function getBlogs(page = 1, limit = 10): Promise<BlogsResponse> {
  return apiClient<BlogsResponse>(`/api/blogs?page=${page}&limit=${limit}`);
}

export async function getBlogById(id: string): Promise<SingleBlogResponse> {
  return apiClient<SingleBlogResponse>(`/api/blogs/${id}`);
}

export async function createBlog(data: { title: string; description: string }) {
  return apiClient<SingleBlogResponse>('/api/blogs', {
    method: 'POST',
    body: JSON.stringify(data),
    requireAuth: true
  });
}
