import { useRouter } from "next/router";
import { useState, useEffect, type FormEvent } from "react";
import toast from "react-hot-toast";
import { api } from "~/utils/api";

export const RoomConnectionButtons = () => {
  const [input, setInput] = useState("");
  const [disabled, setDisabled] = useState(true);

  const router = useRouter();

  const createRoom = api.rooms.create.useMutation({
    onSuccess: async (data) => {
      await router.push(`/room/${data.id}`);
    },
  });

  const joinRoomById = api.rooms.getById.useQuery(
    { roomId: input },
    {
      onSuccess: (data) => {
        void router.push(`/room/${data.id}`);
      },
      onError: () => {
        toast.error("This room does not exist");
      },
      enabled: false,
    }
  );

  const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void joinRoomById.refetch();
  };

  useEffect(() => {
    input.trim().length === 0 ? setDisabled(true) : setDisabled(false);
  }, [input]);

  return (
    <>
      <button
        className="btn-primary btn-block btn"
        onClick={() => createRoom.mutate()}
      >
        Create room
      </button>
      <div className="divider">OR</div>
      <div className="form-control">
        <form className="input-group" onSubmit={onFormSubmit}>
          <input
            type="text"
            placeholder="Paste room Id"
            className="input-bordered input w-full"
            onChange={({ target }) => setInput(target.value)}
            value={input}
          />
          <button className="btn-primary btn" disabled={disabled}>
            Join Room
          </button>
        </form>
      </div>
    </>
  );
};
