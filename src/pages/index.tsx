import { type NextPage } from "next";
import { PageLayout } from "~/components/layot";
import { RoomConnectionButtons } from "~/components/room-connection-buttons";

const Home: NextPage = () => {
  return (
    <PageLayout>
      <div className="hero h-full">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Chat-Next</h1>
            <p className="py-10">
              Small chat app made with React, Next.js, tRPC and Prisma.
              Real-time WebSocket connection with Pusher and ratelimiting with
              Upstash. Powered by Vercel
            </p>
            <RoomConnectionButtons />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Home;
