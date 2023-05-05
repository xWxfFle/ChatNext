"use client";
import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { pusherClient } from "~/lib/pusherClient";
import { ChatAreaWithScroll } from "./ui/scroll-area";
import { api } from "~/utils/api";
import type { Message } from "@prisma/client";

const Chat: NextPage<{ roomId: string; username: string }> = ({ roomId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const chat = useRef<HTMLDivElement>(null);

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
      chat.current?.scrollTo(0, chat.current.scrollHeight);
    });

    return () => {
      pusherClient.unsubscribe(roomId);
    };
  }, [roomId]);

  useEffect(() => {
    chat.current?.scrollTo(0, chat.current.scrollHeight);
  }, [messages]);

  return (
    <ChatAreaWithScroll ref={chat}>
      {messages.map((message) => (
        <div className=" chat chat-end" key={message.id}>
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
