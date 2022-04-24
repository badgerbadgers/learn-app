// import { NextResponse } from "next/server";
// import { withAuth } from "next-auth/middleware";
// import { getSession } from "next-auth/react";
// import { getServerSession } from "next-auth";
// // import { useSession } from "next-auth/react"

// export async function middleware(req) {

//   if (req.nextUrl.pathname === "/dashboard" || req.nextUrl.pathname === "/knowledge-base/**" ) {
//     const session = await getServerSession({ req })
//     // const session = await getSession();
//     console.log('session in middleware: ', session)
//     // const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
//     // console.log('protected routes')

//     // if (!session) return NextResponse.redirect("/");
//   }
//   return NextResponse.next();
// }

// export default withAuth(
//   async function middleware(req) {
//     console.log(req, "req");
//     if (
//       req.nextUrl.pathname === "/dashboard" ||
//       req.nextUrl.pathname === "/knowledge-base/*"
//     ) {
//       // const session = await getSession();
//       // console.log('session in middleware: ', session)
//       // const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
//       console.log("protected routes");

//       // if (!session) return NextResponse.redirect("/");
//     }
//     //   return NextResponse.next();
//   },
//   {
//     callbacks: {
//       authorized({ req, token }) {
//         if (token) return true; // If there is a token, the user is authenticated
//       },
//     },
//   }
// );
// export { default } from "next-auth/middleware"