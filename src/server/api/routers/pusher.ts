import { nanoid } from "nanoid";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { pusherServer } from "~/utils/pusherApi";

export const pusherRouter = createTRPCRouter({
  auth: publicProcedure
    .input(
      z.object({
        socketId: z.string(),
        channelName: z.string(),
      })
    )
    .query(({ input }) => {
      const id = nanoid();

      const presenceData = {
        user_id: id,
        user_data: { user_id: id },
      };

      const auth = pusherServer.authorizeChannel(
        input.socketId,
        input.channelName,
        presenceData
      );
      return auth;
    }),
});
