// src/app/lib/getTokenServer.js

import { headers } from "next/headers";
import { auth } from "./auth";


export async function getTokenServer() {
  const requestHeaders = await headers();

  try {
    const res = await auth.api.getToken({
      headers: requestHeaders,
    });
    return res?.token || null;
  } catch (err) {
    return null;
  }
}
