// src/app/lib/getTokenServer.js

import { headers } from "next/headers";
import { auth } from "./auth";


export async function getTokenServer() {
  const requestHeaders = await headers();

  const { token } = await auth.api.getToken({
    headers: requestHeaders,
  });

  return token;
}
