"use client";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { pusherClient } from "~/utils/pusherClient";

interface MessageProps {
  roomId: string;
  initialMessages?: { id: string; text: string }[];
}

const Messages: NextPage<MessageProps> = ({ roomId, initialMessages }) => {
  const [incomingMessages, setIncomingMessages] = useState<string[]>([]);

  useEffect(() => {
    pusherClient.subscribe(roomId);

    pusherClient.bind("incoming-message", (text: string) => {
      setIncomingMessages((prev) => [...prev, text]);
    });

    return () => {
      pusherClient.unsubscribe(roomId);
    };
  });

  return (
    <div>
      {initialMessages?.map((message) => (
        <p key={message.id}>{message.text}</p>
      ))}
      {incomingMessages.map((text, i) => (
        <p key={i}>{text}</p>
      ))}
    </div>
  );
};

export default Messages;
