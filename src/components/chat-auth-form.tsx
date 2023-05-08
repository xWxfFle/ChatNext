import { useAtom } from "jotai";
import { type FormEvent, useEffect, useState } from "react";
import { usernameAtom } from "~/lib/atoms";

export const ChatAuthForm = () => {
  const [input, setInput] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [, setUsername] = useAtom(usernameAtom);
  const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUsername(input);
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
        placeholder="Input your username"
        value={input}
        type="text"
      />
      <button className="btn-primary btn" type="submit" disabled={disabled}>
        Start chatting
      </button>
    </form>
  );
};
