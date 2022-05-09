import { NextResponse } from "next/server";
import { getSession } from "next-auth/react";

export async function middleware(req) {
  const requestForNextAuth = {
    headers: {
      cookie: req.headers.get("cookie"),
    },
  };
  const session = await getSession({ req: requestForNextAuth });

  // console.log(req.nextUrl.pathname, 'path name')

  if (
    req.nextUrl.pathname === "/dashboard" ||
    /*TODO: would like to refactor 
    but unsure the best way to do multiple with /k-b routes
    "/knowledge-base/**" doesn't work */
    req.nextUrl.pathname === "/knowledge-base/zones" ||
    req.nextUrl.pathname === "/knowledge-base/resources" ||
    req.nextUrl.pathname === "/knowledge-base/pair-pgr-page" ||
    req.nextUrl.pathname === "/myprojects" ||
    req.nextUrl.pathname === "/signup" ||
    req.page.name === "/userform/[id]"
  ) {
    if (session) {
    //   console.log(session, "session-middleware");
      // validate your session here
      return NextResponse.next();
    } else {
      // the user is not logged in, redirect to home page
    //   console.log("user not logged in");
      return NextResponse.redirect(process.env.NEXTAUTH_URL);
    }
  }
}
