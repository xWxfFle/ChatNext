import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
});


import { pusherServer } from '@/lib/pusher'

export async function POST(req: Request) {
  const { text, roomId } = await req.json()

  pusherServer.trigger(roomId, 'incoming-message', text)

  await ctx.prisma.message.create({
    data: {
      text,
      chatRoomId: roomId,
    },
  })

  return new Response(JSON.stringify({ success: true }))