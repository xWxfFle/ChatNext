"use client";

import type { NextPage } from "next";
import { api } from "~/utils/api";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";

const MessageField: NextPage<{ roomId: string}> = ({ roomId }) => {
  let input = "";
  const sendMessage = api.message.send.useMutation();


  return (
    <div className="flex gap-2">
      <Input
        onChange={({ target }) => (input = target.value)}
        placeholder="Text Message"
        type="text"
      />
      <Button onClick={() => sendMessage.mutate({ roomId, text: input })}>
        send
      </Button>
    </div>
  );
};

export default MessageField;
