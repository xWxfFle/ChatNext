import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { api } from "~/utils/api";
import Custom404 from "../404";
import Messages from "~/components/chat";
import MessageField from "~/components/chatForm";

const RoomPage: NextPage<{ roomId: string }> = ({ roomId }) => {
  const { data } = api.rooms.getRoomById.useQuery(
    { roomId },
    { refetchOnWindowFocus: false, refetchOnMount: false }
  );

  if (!data)
    return <Custom404 сustomMessage="404 - This room does not exist" />;

  const messages = api.message.getAllMessageByRoomId.useQuery(
    {
      roomId,
    },
    { refetchOnWindowFocus: false, refetchOnMount: false }
  );
  const preveousMessages = messages.data?.map((message) => ({
    text: message.text,
    id: message.id,
  }));

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div>
        <p className="text-3xl text-gray-50">Hello from room: {data.id}</p>
        <Messages roomId={data.id} initialMessages={preveousMessages} />
        <MessageField roomId={data.id}></MessageField>
      </div>
    </main>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();

  const roomId = context.params?.roomId;

  if (typeof roomId !== "string") throw new Error("no id");

  await ssg.rooms.getRoomById.prefetch({ roomId });
  await ssg.message.getAllMessageByRoomId.prefetch({roomId})

  return {
    props: {
      trpcState: ssg.dehydrate(),
      roomId,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default RoomPage;
