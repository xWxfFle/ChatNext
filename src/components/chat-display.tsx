import { useEffect, useRef, useState } from "react";
import { pusherClient } from "~/lib/pusherClient";
import type { Message } from "@prisma/client";
import { useAtom } from "jotai";

import { api } from "~/utils/api";
import { ChatAreaWithScroll } from "./ui/scroll-area";
import { usernameAtom } from "~/lib/atoms";

export const Chat = (props: { roomId: string }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [username] = useAtom(usernameAtom);

  const chat = useRef<HTMLDivElement>(null);

  api.message.getAllByRoomId.useQuery(
    { roomId: props.roomId },
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => setMessages(data),
    }
  );

  useEffect(() => {
    pusherClient.subscribe(props.roomId);
    pusherClient.unbind_all();
    pusherClient.bind("incoming-message", (message: Message) => {
      setMessages((prev) => [...prev, message]);
      chat.current?.scrollTo(0, chat.current.scrollHeight);
    });

    return () => {
      pusherClient.unsubscribe(props.roomId);
    };
  }, [props.roomId]);

  useEffect(() => {
    chat.current?.scrollTo(0, chat.current.scrollHeight);
  }, [messages]);

  return (
    <ChatAreaWithScroll ref={chat}>
      {messages.map((message) => (
        <div
          className={`chat ${
            username === message.username ? "chat-end" : "chat-start"
          }`}
          key={message.id}
        >
          <div className="chat-header">{message.username}</div>
          <div
            className={`chat-bubble break-all ${
              username === message.username
                ? "chat-bubble-primary"
                : "chat-bubble-secondary"
            }`}
          >
            {message.text}
          </div>
        </div>
      ))}
    </ChatAreaWithScroll>
  );
};
