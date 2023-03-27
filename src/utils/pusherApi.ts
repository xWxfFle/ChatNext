import PusherClient from "pusher-js";
import PusherServer from "pusher";
import { env } from "~/env.mjs";

export const pusherServer = new PusherServer({
  appId: env.PUSHER_APP_ID,
  key: env.NEXT_PUBLIC_PUSHER_APP_KEY,
  secret: env.PUSHER_APP_SECRET,
  cluster: env.PUSHER_APP_CLUSTER,
  useTLS: true,
});

export const pusherClient = new PusherClient(env.NEXT_PUBLIC_PUSHER_APP_KEY, {
  userAuthentication: {
    endpoint: "/api/trpc/pusher",
    transport: "ajax",
    params: {},
    headers: { "Content-Type": "application/json" },
  },

  cluster: env.PUSHER_APP_CLUSTER,
  forceTLS: true,
});
