import ThemeContextWrapper from "../components/theme/ThemeContextWrapper";
import PrivateLayout from "../components/PrivateLayout";
import PublicLayout from "../components/PublicLayout";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  
  return (
    <SessionProvider session={session} >
    <ThemeContextWrapper>
        {(Component.name === "Portfolio" || Component.name === "Home") ? (
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
  );
}

export default MyApp;