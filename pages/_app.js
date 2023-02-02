import ThemeContextWrapper from "../components/theme/ThemeContextWrapper";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  // If the component has a getLayout() function, use it. Otherwise just render the page as is.
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <>
      <Head>
        <title>Learn</title>
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

