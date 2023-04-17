import { type AppType } from "next/app";
import { Oxygen } from "next/font/google";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const oxygen = Oxygen({
  weight: "400",
  subsets: ["latin"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={oxygen.className}>
      <Component {...pageProps} />
    </main>
  );
};

export default api.withTRPC(MyApp);
