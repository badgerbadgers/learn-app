import ThemeContextWrapper from "../components/theme/ThemeContextWrapper";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import Head from "next/head";
import { SnackbarProvider } from "material-ui-snackbar-provider";

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
          <SnackbarProvider SnackbarProps={{ autoHideDuration: 6000 }}>
            {getLayout(<Component {...pageProps} />)}
          </SnackbarProvider>
        </ThemeContextWrapper>
      </SessionProvider>
    </>
  );
}

export default MyApp;