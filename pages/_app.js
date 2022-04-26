import ThemeContextWrapper from "../components/theme/ThemeContextWrapper";
import PrivateLayout from "../components/PrivateLayout";
import PublicLayout from "../components/PublicLayout";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import { createContext, useState, useMemo } from "react";

export const UserNameChangeContext = createContext({
  userNameChange: () => {},
});

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [isUserNameChanged, setIsUserNameChanged] = useState(false)
  const handleUserNameChange = useMemo(
    () => ({
    userNameChange: (prevValue) => {
      const newVal = !prevValue;
      setIsUserNameChanged(newVal);
    },
    isUserNameChanged,
  }), [isUserNameChanged]
  );

  

  
  
  return (
    <SessionProvider session={session} >
    <ThemeContextWrapper>
    <UserNameChangeContext.Provider value={handleUserNameChange}>
        {(Component.displayName === "Portfolio" || Component.displayName === "Home") ? (
          <PublicLayout>
            <Component {...pageProps} />
          </PublicLayout>
        ) : (
          <PrivateLayout>
            <Component {...pageProps} />
          </PrivateLayout>
        )}
      </UserNameChangeContext.Provider>
      </ThemeContextWrapper>
    </SessionProvider>
  );
}

export default MyApp;