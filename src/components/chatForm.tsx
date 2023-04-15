"use client";

import type { NextPage } from "next";
import { api } from "~/utils/api";

const MessageField: NextPage<{ roomId: string}> = ({ roomId }) => {
  let input = "";
  const sendMessage = api.message.send.useMutation();


  return (
    <div className="flex gap-2">
      <input
        className="input"
        onChange={({ target }) => (input = target.value)}
        placeholder="Text Message"
        type="text"
      />
      <button className="btn" onClick={() => sendMessage.mutate({ roomId, text: input })}>
        send
      </button>
    </div>
  );
};

export default MessageField;
