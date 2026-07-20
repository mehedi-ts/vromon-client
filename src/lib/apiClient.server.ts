import { getTokenServer } from "./getTokenServer";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface FetchOptions extends RequestInit {
  requireAuth?: boolean;
  rawResponse?: boolean;
}

export async function apiClientServer<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { requireAuth = false, rawResponse = false, headers, ...customOptions } = options;

  const authHeaders: HeadersInit = {};

  if (requireAuth) {
    const token = await getTokenServer();

    if (!token) {
      throw new Error("Authentication token not found on the server");
    }

    authHeaders.Authorization = `Bearer ${token}`;
  }

  const config: RequestInit = {
    // Note: 'credentials' option is primarily for browsers, but kept for fetch polyfills parity
    credentials: "omit", // We omit cookies since we are sending Bearer token from Node.js
    ...customOptions,
    headers: {
      "Content-Type": "application/json",
      ...authHeaders,
      ...headers,
    },
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (rawResponse) {
    return response as unknown as T;
  }

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
