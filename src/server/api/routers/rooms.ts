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
      const room = await ctx.prisma.chatRoom.delete({
        where: {
          id: input.roomId,
        },
      });
      return room;
    }),
});
