"use client";

import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";

const ChatForm: NextPage<{ roomId: string; username: string }> = ({
  roomId,
  username,
}) => {
  const sendMessage = api.message.send.useMutation();

  const [input, setInput] = useState("");
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    input.trim().length === 0 ? setDisabled(true) : setDisabled(false);
  }, [input]);

  return (
    <div className="flex gap-3 p-4 ">
      <input
        className="input-bordered input w-full"
        onChange={({ target }) => setInput(target.value)}
        placeholder="Text Message"
        value={input}
        type="text"
      />
      <button
        className="btn-primary btn"
        disabled={disabled}
        onClick={() => {
          sendMessage.mutate({ roomId, text: input, username });
          setInput("");
        }}
      >
        send
      </button>
    </div>
  );
};

export default ChatForm;
