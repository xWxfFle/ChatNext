import type { PropsWithChildren } from "react";
import { NavBar } from "./ui/NavBar";
import { Footer } from "./ui/Footer";

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
