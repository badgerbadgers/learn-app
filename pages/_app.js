import ThemeContextWrapper from "../components/theme/ThemeContextWrapper";
import PrivateLayout from "../components/PrivateLayout";
import PublicLayout from "../components/PublicLayout";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
   // Use the layout defined at the page level, if available
   const getLayout = Component.getLayout || ((page) => page)
  return (
    <>
      <Head>
        <title>Code the Dream Labs Internal Application </title>
      </Head>
      <SessionProvider session={session}>
        <ThemeContextWrapper>
        {getLayout(<Component {...pageProps} />)}
        </ThemeContextWrapper>
      </SessionProvider>
    </>
  );
}

export default MyApp;
