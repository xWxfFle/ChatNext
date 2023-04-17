import type { NextPage } from "next";
import { useRouter } from "next/router";
import { PageLayout } from "~/components/layot";

const Custom404: NextPage<{ сustomMessage?: string }> = ({ сustomMessage }) => {
  const router = useRouter();

  return (
    <PageLayout>
      <div className="flex h-full flex-col items-center justify-center">
        <h1 className="py-4 text-3xl">
          {сustomMessage ? сustomMessage : "404 - Page Not Found"}
        </h1>

        <button
          className="btn-primary btn w-2/3"
          onClick={() => {
            void router.push("/");
          }}
        >
          Back
        </button>
      </div>
    </PageLayout>
  );
};
export default Custom404;
