export async function sendChatMessageStream(message: string, packageId?: string): Promise<Response> {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = "Bearer ${token}";
  }

  return fetch("/api/chat/message", {
    method: 'POST',
    headers,
    body: JSON.stringify({ message, packageId }),
  });
}