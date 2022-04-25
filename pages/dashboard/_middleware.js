import { NextResponse } from 'next/server';
import { getSession } from 'next-auth/react';

export async function middleware(req) {
  const requestForNextAuth = {
    headers: {
      cookie: req.headers.get('cookie'),
    },
  };

  const session = await getSession({ req: requestForNextAuth });

  if (session) {
    console.log(session, 'session-middleware');
    // validate your session here
    return NextResponse.next();
  } else {
    // the user is not logged in, redirect to home page
    return NextResponse.redirect(process.env.NEXTAUTH_URL);
  }
}