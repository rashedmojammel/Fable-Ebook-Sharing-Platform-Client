import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db(process.env.AUTH_DB_NAME);

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },

  database: mongodbAdapter(db, {
    client,
  }),

  
  user: {
    additionalFields: {
      userRole: {
        type: "string",
        input: true,
      },
    },
  },

  
  databaseHooks: {
    user: {
      before: async (user) => {
        const role = user.userRole;

        return {
          ...user,
          userRole: role || "reader",
        };
      },
    },
  },

  plugins: [admin()],
});