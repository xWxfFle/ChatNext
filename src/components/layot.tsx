import type { PropsWithChildren } from "react";
import NavBar from "./ui/NavBar";

export const PageLayout = (props: PropsWithChildren) => {
  return (
    <main
      className="overflow-none flex h-screen justify-center"
      data-theme="dark"
    >
      <div className="flex h-full w-full flex-col lg:max-w-xl">
        <NavBar />
        {props.children}
        <footer className="bg-base-300 sm:bg-base-100 footer footer-center p-4 text-base-content">
          <div>
            <p>Copyright © 2023 - Arseniy Filatov</p>
          </div>
        </footer>
      </div>
    </main>
  );
};
