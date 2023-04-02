"use client";

import type { NextPage } from "next";
import { api } from "~/utils/api";

const MessageField: NextPage<{ roomId: string}> = ({ roomId }) => {
  let input = "";
  const sendMessage = api.message.send.useMutation();


  return (
    <div className="flex gap-2">
      type a new message:
      <input
        onChange={({ target }) => (input = target.value)}
        className="border border-zinc-300"
        type="text"
      />
      <button onClick={() => sendMessage.mutate({roomId, text: input})}>send</button>
    </div>
  );
};

export default MessageField;
