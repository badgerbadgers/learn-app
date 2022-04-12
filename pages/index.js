import { Button, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import LogIn from "../components/Login";

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <h1 className="title">
        Code the Dream Apprentice Landing Page</h1>
      <LogIn></LogIn>

      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        {session && (
          <>
          <li>
            <Link href={`/portfolios/${encodeURIComponent(session.user.gh)}`}>
              View Portfolio Page
            </Link>
          </li>
          <li>
            <Link href={`/userform/${encodeURIComponent(session.user.gh)}`}>
              Edit Portfolio Page
            </Link>
          </li>
          </>
        )}
      </ul>
    </>
  );
}

