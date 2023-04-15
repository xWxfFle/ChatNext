import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { pusherServer } from "~/lib/pusherServer";

export const messageRouter = createTRPCRouter({
  send: publicProcedure
    .input(z.object({ roomId: z.string(), text: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await pusherServer.trigger(input.roomId, "incoming-message", input.text);
      const message = await ctx.prisma.message.create({
        data: {
          text: input.text,
          chatRoomId: input.roomId,
        },
      });

      return message;
    }),
  getAllMessageByRoomId: publicProcedure
    .input(z.object({ roomId: z.string() }))
    .query(async ({ ctx, input }) => {
      const messages = await ctx.prisma.message.findMany({
        where: {
          chatRoomId: input.roomId,
        },
      });
      return messages;
    }),
});
