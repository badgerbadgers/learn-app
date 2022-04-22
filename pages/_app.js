import ThemeContextWrapper from "../components/theme/ThemeContextWrapper";
import PrivateLayout from "../components/PrivateLayout";
import PublicLayout from "../components/PublicLayout";
import { SessionProvider, useSession } from "next-auth/react";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ThemeContextWrapper>
        {Component.displayName === "Portfolio" ||
        Component.displayName === "Home" ? (
          <PublicLayout>
            <Component {...pageProps} />
          </PublicLayout>
        ) : (
          Component.auth && (
            <Auth>
              <PrivateLayout>
                <Component {...pageProps} />
              </PrivateLayout>
            </Auth>
          )
        )}
      </ThemeContextWrapper>
    </SessionProvider>
  );
}

export default MyApp;

function Auth({ children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return children;
}
