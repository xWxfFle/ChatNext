"use client"
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { pusherClient } from "~/utils/pusherClientApi";

const Messages: NextPage<{ initialMessages?: string; roomId: string }> = ({
  initialMessages,
  roomId,
}) => {
  const [incomingMessages, setIncomingMessages] = useState<string[]>([]);

  useEffect(() => {
    pusherClient.subscribe(roomId);

    pusherClient.bind("incoming-message", (text: string) => {
      setIncomingMessages((prev) => [...prev, text]);
    });

    return () => {
      pusherClient.unsubscribe(roomId);
    };
  }, []);

  return (
    <div>
      hee
    </div>
  );
};

export default Messages;
