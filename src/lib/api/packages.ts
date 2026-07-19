import { apiClient } from '../apiClient';
import { Package } from '../schemas';

export interface PackagesResponse {
  success: boolean;
  data: Package[];
  total: number;
  page: number;
  limit: number;
}

export interface PackageResponse {
  success: boolean;
  data: Package;
}

export interface PackageFilters {
  search?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  minDuration?: string;
  maxDuration?: string;
  minRating?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export async function getPackages(filters: PackageFilters = {}): Promise<PackagesResponse> {
  const params = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      params.append(key, String(value));
    }
  });

  const queryString = params.toString() ? `?${params.toString()}` : '';
  return apiClient<PackagesResponse>(`/api/packages${queryString}`);
}

export async function getPackageById(id: string): Promise<PackageResponse> {
  return apiClient<PackageResponse>(`/api/packages/${id}`);
}

export async function getMyPackages(): Promise<PackagesResponse> {
  return apiClient<PackagesResponse>('/api/packages/mine', { requireAuth: true });
}
