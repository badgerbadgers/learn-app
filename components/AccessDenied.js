import { signIn } from "next-auth/react";
import Link from "next/link";

export default function AccessDenied() {
  return (
    <>
      <h1>Access Denied</h1>
        <Link
          href="/api/auth/signin" // is this correct? double check 
          onClick={(e) => {
            e.preventDefault()
            signIn()
          }}
        >
          You must be signed in to view this page
        </Link>
    </>
  )
}