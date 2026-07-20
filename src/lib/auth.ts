import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db("vromonAI");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),
    emailAndPassword: {    
        enabled: true
  },
     socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },
    
  session: {
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge:7*24*60*60

      }
    },
  plugins: [
      jwt()
    ]
});

import { headers } from 'next/headers';
import { jwt } from "better-auth/plugins";

export const getServerSession = async () => {
  return await auth.api.getSession({
    headers: await headers()
  });
};

export const getServerUser = async () => {
  const session = await getServerSession();
  return session?.user || null;
};