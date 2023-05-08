import { useAtom } from "jotai";
import { type FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { usernameAtom } from "~/lib/atoms";

import { api } from "~/utils/api";

export const ChatMessageForm = (props: { roomId: string }) => {
  const [username] = useAtom(usernameAtom);

  const sendMessage = api.message.send.useMutation({
    onError: () => {
      toast.error("Too many messages, please wait.");
    },
  });

  const [input, setInput] = useState("");
  const [disabled, setDisabled] = useState(true);
  const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage.mutate({
      roomId: props.roomId,
      text: input,
      username: username,
    });
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
