import ThemeContextWrapper from "../components/theme/ThemeContextWrapper";
import PrivateLayout from "../components/PrivateLayout";
import PublicLayout from "../components/PublicLayout";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import Head from "next/head";



function MyApp({ Component, pageProps: { session, ...pageProps } }) {
   
  return (
    <>
    <Head>
      <title>Code the Dream Labs Internal Application </title>
    </Head>
    <SessionProvider session={session} >
    <ThemeContextWrapper>
        {(Component.displayName === "Portfolio" || Component.displayName === "Home") ? (
          <PublicLayout>
            <Component {...pageProps} />
          </PublicLayout>
        ) : (
          <PrivateLayout>
            <Component {...pageProps} />
          </PrivateLayout>
        )} 
      </ThemeContextWrapper>
    </SessionProvider>
    </>
  );
}

export default MyApp;