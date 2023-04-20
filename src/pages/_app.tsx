import { ThemeProvider } from "next-themes";
import Head from "next/head";

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
      <ThemeProvider>
        <Head>
          <title>Chat Next⚡</title>
          <meta name="description" content="💬" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </ThemeProvider>
    </main>
  );
};

export default api.withTRPC(MyApp);
