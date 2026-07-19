const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface FetchOptions extends RequestInit {
  requireAuth?: boolean;
}

export async function apiClient<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { requireAuth = false, headers, ...customOptions } = options;

  const config: RequestInit = {
    ...customOptions,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (requireAuth) {
    // NOTE: Replace this with actual token retrieval once auth is implemented
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  let data;
  try {
    data = await response.json();
  } catch (error) {
    throw new Error('Failed to parse response as JSON');
  }

  if (!response.ok) {
    throw new Error(data.message || `API request failed with status ${response.status}`);
  }

  return data as T;
}
