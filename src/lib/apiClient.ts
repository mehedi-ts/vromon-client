import { getTokenClient } from "./getTokenClient";


const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface FetchOptions extends RequestInit {
  requireAuth?: boolean;
}

export async function apiClient<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { requireAuth = false, headers, ...customOptions } = options;

  const authHeaders: HeadersInit = {};

  if (requireAuth) {
    const token = await getTokenClient();

    if (!token) {
      throw new Error("Authentication token not found");
    }

    authHeaders.Authorization = `Bearer ${token}`;
  }

  const config: RequestInit = {
    credentials: "include",
    ...customOptions,
    headers: {
      "Content-Type": "application/json",
      ...authHeaders,
      ...headers,
    },
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  let data: unknown;

  try {
    data = await response.json();
  } catch {
    throw new Error("Failed to parse response as JSON");
  }

  if (!response.ok) {
    const error = data as { message?: string };

    throw new Error(
      error.message || `API request failed with status ${response.status}`
    );
  }

  return data as T;
}