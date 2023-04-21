import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { api } from "~/utils/api";

const RoomConnectionButtons = () => {
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
        console.log("Smt bad");
      },
      enabled: false,
    }
  );

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
        <div className="input-group">
          <input
            type="text"
            placeholder="Paste room Id"
            className="input-bordered input w-full"
            onChange={({ target }) => setInput(target.value)}
            value={input}
          />
          <button
            className="btn-primary btn"
            disabled={disabled}
            onClick={() => {
              void joinRoomById.refetch();
            }}
          >
            Join Room
          </button>
        </div>
      </div>
    </>
  );
};
export default RoomConnectionButtons;
