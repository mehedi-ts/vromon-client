import { authClient } from "./auth-client";


export async function getTokenClient() {
  const { data } = await authClient.token();

  return data?.token ?? null;
}