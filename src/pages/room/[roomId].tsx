import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { api } from "~/utils/api";
import Custom404 from "../404";

import { ChatMessageForm } from "~/components/chat-message-form";
import { PageLayout } from "~/components/layot";
import { Chat } from "~/components/chat-display";
import { ChatAuthForm } from "~/components/chat-auth-form";
import { useAtom } from "jotai";
import { roomAtom, usernameAtom } from "~/lib/atoms";

const RoomPage: NextPage<{ roomId: string }> = ({ roomId }) => {
  const [username] = useAtom(usernameAtom);
  const [,setRoom] = useAtom(roomAtom);

  const { data } = api.rooms.getById.useQuery(
    { roomId },
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        setRoom(data.id);
      },
    }
  );

  if (!data) return <Custom404 сustomMessage="404 - Room Not Found" />;

  return (
    <PageLayout>
      <Chat roomId={data.id} />
      <div className="divider h-0" />
      {username && <ChatMessageForm roomId={data.id} />}
      {!username && <ChatAuthForm />}
      <div className="w-full text-center">
      </div>
      <div className="divider h-0" />
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
