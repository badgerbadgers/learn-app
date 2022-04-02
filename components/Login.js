
   
import { useSession, signIn, signOut } from "next-auth/react";

export default function LogIn() {
  const { data: session, status } = useSession();

  const logIn = (e) => {
    e.preventDefault();
    signIn("github");
  };

  const logOut = (e) => {
    e.preventDefault();
    signOut();
  };

  if (status === "authenticated") {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={logOut}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={logIn}>Sign in</button>
    </>
  );
}