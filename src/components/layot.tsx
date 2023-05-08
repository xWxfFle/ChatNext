import type { PropsWithChildren } from "react";

import { NavBar } from "./ui/nav-bar";
import { Footer } from "./ui/footer";

export const PageLayout = (props: PropsWithChildren) => {
  return (
    <main className="overflow-none flex h-screen justify-center">
      <div className="flex h-full w-full flex-col lg:max-w-xl">
        <NavBar />
        {props.children}
        <Footer />
      </div>
    </main>
  );
};
