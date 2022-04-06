
   
import { useSession, signIn, signOut } from "next-auth/react";

export default function LogIn() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
      <>
        Signed in as {session.user.name || session.user.gh} <br />
        <button onClick={()=>signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={()=>signIn()}>Sign in</button>
    </>
  );
}