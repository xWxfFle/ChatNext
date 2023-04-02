import type { NextPage } from "next";

const Custom404: NextPage<{сustomMessage?: string}> = ({ сustomMessage}) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div>
        <p className="text-3xl text-gray-50">
          {сustomMessage ? сustomMessage : "404 - Page Not Found"}
        </p>
      </div>
    </main>
  );
};
export default Custom404;
