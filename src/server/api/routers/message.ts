import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { pusherServer } from "~/lib/pusherServer";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { TRPCError } from "@trpc/server";

// Create a new ratelimiter, that allows 3 requests per 10 seconds
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(1, "3 s"),
  analytics: true,
});

export const messageRouter = createTRPCRouter({
  send: publicProcedure
    .input(
      z.object({ roomId: z.string(), text: z.string(), username: z.string() })
    )
    .mutation(async ({ input, ctx }) => {
      const { success } = await ratelimit.limit(input.username);
      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      await pusherServer.trigger(input.roomId, "incoming-message", {
        text: input.text,
        username: input.username,
      });

      const message = await ctx.prisma.message.create({
        data: {
          text: input.text,
          username: input.username,
          chatRoomId: input.roomId,
        },
      });

      return message;
    }),
  getAllByRoomId: publicProcedure
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
