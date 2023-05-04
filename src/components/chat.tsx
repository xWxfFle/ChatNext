"use client";
import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { pusherClient } from "~/lib/pusherClient";
import { ChatAreaWithScroll } from "./ui/ScrollArea";
import { api } from "~/utils/api";
import type { Message } from "@prisma/client";

const Chat: NextPage<{ roomId: string; username: string }> = ({ roomId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const chat = useRef<typeof ChatAreaWithScroll>();

  api.message.getAllByRoomId.useQuery(
    { roomId: roomId },
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => setMessages(data),
    }
  );

  useEffect(() => {
    pusherClient.subscribe(roomId);
    pusherClient.unbind_all();
    pusherClient.bind("incoming-message", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      pusherClient.unsubscribe(roomId);
    };
  }, [roomId]);

  return (
    <ChatAreaWithScroll ref={chat}>
      {messages.map((message, index) => (
        <div className=" chat chat-end" key={index}>
          <div className="chat-header">{message.username}</div>
          <div className="chat-bubble chat-bubble-primary break-all">
            {message.text}
          </div>
        </div>
      ))}
    </ChatAreaWithScroll>
  );
};

export default Chat;
