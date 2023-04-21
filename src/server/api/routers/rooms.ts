import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const roomsRouter = createTRPCRouter({
  create: publicProcedure.mutation(async ({ ctx }) => {
    const room = await ctx.prisma.chatRoom.create({ data: {} });
    return room;
  }),

  getById: publicProcedure
    .input(z.object({ roomId: z.string() }))
    .query(async ({ ctx, input }) => {
      const room = await ctx.prisma.chatRoom.findUnique({
        where: { id: input.roomId },
      });
      if (!room) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Room not found",
        });
      }
      return room;
    }),
});
