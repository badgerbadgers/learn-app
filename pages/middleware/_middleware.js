// import { withAuth } from "next-auth/middleware";

// import { NextResponse } from "next/server";
// import { getSession } from "next-auth/react";

// export async function middleware(req, ctx) {
//   console.log(req, 'req')
//   // || req.nextUrl.pathname === "/knowledge-base/*"
//   if (req.nextUrl.pathname === "/dashboard" ) {
//     const session = await getSession(ctx);
//     // const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
//     console.log('session in middleware: ', session)
//     if (!session) return NextResponse.redirect("/");
//   }
//   return NextResponse.next();
// }

// export { default } from "next-auth/middleware"