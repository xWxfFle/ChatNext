"use client";
import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { pusherClient } from "~/lib/pusherClient";

interface MessageProps {
  roomId: string;
  initialMessages?: { id: string; text: string }[];
}

const Messages: NextPage<MessageProps> = ({ roomId, initialMessages }) => {
  const [incomingMessages, setIncomingMessages] = useState<string[]>([]);
  const field = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    field.current?.scrollTo(0, field.current.scrollHeight);
  }, [incomingMessages]);

  return (
    <div
      ref={field}
      className="carousel-vertical carousel-end carousel  max-h-96"
    >
      {initialMessages?.map((message) => (
        <div className="chat chat-start" key={message.id}>
          <div className="chat-bubble">{message.text}</div>
        </div>
      ))}
      {incomingMessages.map((text, i) => (
        <div className=" chat chat-end" key={i}>
          <div className="chat-bubble">{text}</div>
        </div>
      ))}
    </div>
  );
};

export default Messages;
