"use client";

import type { NextPage } from "next";
import {type FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "~/utils/api";

const ChatForm: NextPage<{ roomId: string; username: string }> = ({
  roomId,
  username,
}) => {
  const sendMessage = api.message.send.useMutation({
    onError: () => {
      toast.error("Too many messages, please wait.");
    },
  });

  const [input, setInput] = useState("");
  const [disabled, setDisabled] = useState(true);
  const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    sendMessage.mutate({ roomId, text: input, username });
    setInput("");
  };

  useEffect(() => {
    input.trim().length === 0 ? setDisabled(true) : setDisabled(false);
  }, [input]);

  return (
    <form className="flex gap-3 p-4" onSubmit={onFormSubmit}>
      <input
        className="input-bordered input w-full"
        onChange={({ target }) => setInput(target.value)}
        placeholder="Text Message"
        value={input}
        type="text"
      />
      <button className="btn-primary btn" type="submit" disabled={disabled}>
        send
      </button>
    </form>
  );
};

export default ChatForm;
