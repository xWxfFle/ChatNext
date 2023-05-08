import { type AppType } from "next/app";
import { Oxygen } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Head from "next/head";

import { Toaster } from "react-hot-toast";

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
          <title>ChatNext 💬</title>
          <meta name="description" content="💬" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Toaster
          toastOptions={{
            className: "",
            position: "bottom-center",
            iconTheme: {
              primary: "hsl(var(--er))",
              secondary: "hsl(var(--pc))",
            },
            style: {
              padding: "16px",
              background: "hsl(var(--p))",
              color: "hsl(var(--pc))",
            },
          }}
        />
        <Component {...pageProps} />
      </ThemeProvider>
    </main>
  );
};

export default api.withTRPC(MyApp);
