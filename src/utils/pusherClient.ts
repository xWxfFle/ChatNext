import PusherClient from "pusher-js";
import { env } from "~/env.mjs";

export const pusherClient = new PusherClient(env.NEXT_PUBLIC_PUSHER_APP_KEY, {
  userAuthentication: {
    endpoint: "/api/pusher/auth",
    transport: "ajax",
    params: {},
    headers: { "Content-Type": "application/json" },
  },
  cluster: env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
});
