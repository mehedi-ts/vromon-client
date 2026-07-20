import { authClient } from "./auth-client";


export async function getTokenClient() {
  const { data } = await (authClient as any).token();

  return data?.token ?? null;
}