"use client";
import type { NextPage } from "next";
import { useEffect,useState } from "react";
import { pusherClient } from "~/lib/pusherClient";
import ScrollAreaDemo from "./ui/ScrollArea";

interface MessageProps {
  roomId: string;
  initialMessages?: { id: string; text: string }[];
}

const Messages: NextPage<MessageProps> = ({ roomId, initialMessages }) => {
  const [incomingMessages, setIncomingMessages] = useState<string[]>([]);
  useEffect(() => {
    pusherClient.subscribe(roomId);

    pusherClient.unbind_all();
    pusherClient.bind("incoming-message", (text: string) => {
      setIncomingMessages((prev) => [...prev, text]);
    });

    return () => {
      pusherClient.unsubscribe(roomId);
    };
  }, [roomId]);

  return (
    <ScrollAreaDemo>
      {initialMessages?.map((message) => (
        <div className="chat chat-start" key={message.id}>
          <div className="chat-bubble chat-bubble-primary break-all">
            {message.text}
          </div>
        </div>
      ))}
      {incomingMessages.map((text, i) => (
        <div className=" chat chat-end" key={i}>
          <div className="chat-bubble chat-bubble-secondary break-all">
            {text}
          </div>
        </div>
      ))}
    </ScrollAreaDemo>
  );
};

export default Messages;
