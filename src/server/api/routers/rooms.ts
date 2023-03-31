import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const roomsRouter = createTRPCRouter({
  create: publicProcedure.mutation(async ({ ctx }) => {
    const room = await ctx.prisma.chatRoom.create({ data: {} });
    return room;
  }),

  delete: publicProcedure
    .input(z.object({ roomId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const message = await ctx.prisma.message.deleteMany({
        where: {
          chatRoomId: input.roomId,
        },
      });
      const room = await ctx.prisma.chatRoom.delete({
        where: {
          id: input.roomId,
        },
      });
      return { room, message };
    }),

  getRoomById: publicProcedure
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
