import { pusherServer } from "~/server/helpers/pusherHelper";

import { nanoid } from "nanoid";

export async function POST(req: Request) {
  const data = await req.text();
  const [socketId, channelName] = data
    .split("&")
    .map((str) => str.split("=")[1]);

  const id = nanoid();

  const presenceData = {
    user_id: id,
    user_data: { user_id: id },
  };

  if (!socketId || !channelName) return new Error("400 - Bad request");

  const auth = pusherServer.authorizeChannel(
    socketId,
    channelName,
    presenceData
  );

  return new Response(JSON.stringify(auth));
}
