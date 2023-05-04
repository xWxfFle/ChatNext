import type { NextPage } from "next";
import Link from "next/link";
import { PageLayout } from "~/components/layot";

const Custom404: NextPage<{ сustomMessage?: string }> = ({ сustomMessage }) => {
  return (
    <PageLayout>
      <div className="flex h-full flex-col items-center justify-center">
        <h1 className="py-4 text-3xl">
          {сustomMessage ? сustomMessage : "404 - Page Not Found"}
        </h1>
          <Link className="btn-primary btn w-2/3" href="/">
            Back
          </Link>
      </div>
    </PageLayout>
  );
};
export default Custom404;
