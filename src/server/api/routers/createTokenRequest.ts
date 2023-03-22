import Ably from "ably/promises";
import { env } from "~/env.mjs";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const tokenRouter = createTRPCRouter({
  create: publicProcedure.query(async () => {
    const client = new Ably.Realtime(env.ABLY_API_KEY);
    const tokenRequestData = await client.auth.createTokenRequest({
      clientId: "ably-nextjs-demo",
    });
    return {
      tokenRequestData,
    };
  }),
});
