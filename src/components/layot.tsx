import type { PropsWithChildren } from "react";

export const PageLayout = (props: PropsWithChildren) => {
  return (
    <main className="overflow-none flex h-screen justify-center">
      <div className="flex h-full w-full flex-col md:max-w-xl">
        {props.children}
        <footer className="footer footer-center p-4 text-base-content">
          <div>
            <p>Copyright © 2023 - Arseniy Filatov</p>
          </div>
        </footer>
      </div>
    </main>
  );
};
