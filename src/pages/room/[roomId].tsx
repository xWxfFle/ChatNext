import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { api } from "~/utils/api";
import Custom404 from "../404";
import Messages from "~/components/chat";
import ChatForm from "~/components/chatForm";
import { PageLayout } from "~/components/layot";

const RoomPage: NextPage<{ roomId: string }> = ({ roomId }) => {
  const { data } = api.rooms.getRoomById.useQuery(
    { roomId },
    { refetchOnWindowFocus: false }
  );

  if (!data) return <Custom404 сustomMessage="404 - Room Not Found" />;

  const messages = api.message.getAllMessageByRoomId.useQuery(
    {
      roomId,
    },
    { refetchOnWindowFocus: false }
  );
  const preveousMessages = messages.data?.map((message) => ({
    text: message.text,
    id: message.id,
  }));

  return (
    <PageLayout>
      <Messages roomId={data.id} initialMessages={preveousMessages} />
      <div className="divider"></div>
      <ChatForm roomId={data.id}></ChatForm>
      <div className="w-full text-center">
        <h1 className="text-xl">
          Room id: <span className="text-primary">{data.id}</span>
        </h1>
      </div>
      <div className="divider"></div>
    </PageLayout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();

  const roomId = context.params?.roomId;

  if (typeof roomId !== "string") throw new Error("no id");

  await ssg.rooms.getRoomById.prefetch({ roomId });
  await ssg.message.getAllMessageByRoomId.prefetch({ roomId });

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
