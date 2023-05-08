import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { api } from "~/utils/api";
import Custom404 from "../404";

import { ChatMessageForm } from "~/components/chat-message-form";
import { PageLayout } from "~/components/layot";
import { Chat } from "~/components/chat-display";
import { ChatAuthForm } from "~/components/chat-auth-form";
import { useAtom } from "jotai";
import { usernameAtom } from "~/lib/atoms";

const RoomPage: NextPage<{ roomId: string }> = ({ roomId }) => {
  const { data } = api.rooms.getById.useQuery(
    { roomId },
    { refetchOnWindowFocus: false }
  );
  const [username] = useAtom(usernameAtom);

  if (!data) return <Custom404 сustomMessage="404 - Room Not Found" />;

  return (
    <PageLayout>
      <Chat roomId={data.id} />
      <div className="divider" />
      {username && <ChatMessageForm roomId={data.id} />}
      {!username && <ChatAuthForm />}
      <div className="w-full text-center">
        <h1 className="text-xl">
          Room id: <span className="text-primary">{data.id}</span>
        </h1>
      </div>
      <div className="divider" />
    </PageLayout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();

  const roomId = context.params?.roomId;

  if (typeof roomId !== "string") throw new Error("no id");

  await ssg.rooms.getById.prefetch({ roomId });

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
