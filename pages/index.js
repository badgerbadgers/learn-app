import { getSession, useSession } from "next-auth/react";
import clientPromise from "../lib/mongodb";
import Link from "next/link";
import LogIn from "../components/Login";

export default function Home({ isConnected }) {
  const { data: session } = useSession();

  return (
    <>
      <h1 className="title">Code the Dream Apprentice Landing Page</h1>
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

      {isConnected ? (
        <h2 className="subtitle">You are connected to MongoDB</h2>
      ) : (
        <h2 className="subtitle">
          You are NOT connected to MongoDB. Check the <code>README.md</code> for
          instructions.
        </h2>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    // client.db() will be the default database passed in the MONGODB_URI
    // You can change the database by calling the client.db() function and specifying a database like:
    // const db = client.db("myDatabase");
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands
    await clientPromise;
    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      session: await getSession(context), 
      props: { isConnected: false },
    };
  }
}