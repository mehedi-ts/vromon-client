import { jwtClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
  baseURL: "http://localhost:3000",
  plugins: [
    jwtClient()
  ],
})

export const getCurrentSession = () => {
  return authClient.useSession();
};

export const getCurrentUser = () => {
  const { data: session, isPending } = authClient.useSession();
  return { user: session?.user || null, isPending };
};