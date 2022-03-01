import NextAuth from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import GitHubProvider from "next-auth/providers/github";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  // jwt: true,
  logger: {
    error(code, metadata) {
      console.error(code, metadata)
    },
    warn(code) {
      console.warn(code)
    },
    debug(code, metadata) {
      console.debug(code, metadata)
    }
  },
  session: {
    // Choose how you want to save the user session.
    // The default is `"jwt"`, an encrypted JWT (JWE) in the session cookie.
    // If you use an `adapter` however, we default it to `"database"` instead.
    // You can still force a JWT session by explicitly defining `"jwt"`.
    // When using `"database"`, the session cookie will only contain a `sessionToken` value,
    // which is used to look up the session in the database.
    strategy: "database",
  
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days
  
    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours
  },
  callbacks:{
  // async session({ session, token, user }) {
  //   console.debug(user, 'session-user');
  //   return session
  // },
  async signIn({ user, account, profile, email, credentials }) {
    console.debug(profile, 'profile')
    return true
  }
  // async jwt({ token, user, account, profile, isNewUser }) {
  //   console.debug(user, 'jwt-user');
  //   console.debug(profile, 'jwt-profile');
  //   return profile
  // }
},
// events: {
//   async signIn(message) { /* on successful sign in */ },
//   async signOut(message) { /* on signout */ },
//   async createUser(message) { /* user created */ },
//   async updateUser(message) { /* user updated - e.g. their email was verified */ },
//   async linkAccount(message) { /* account (e.g. Twitter) linked to a user */ },
//   async session(message) { /* session is active */ },
//   async error(message) { /* error in authentication flow */ }
// },
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    //   profile(profile) {
    //     return {
    //       id: profile.sub,
    //       name: profile.name,
    //       email: profile.email,
    //       image: profile.picture,
    //       gh: profile.login,
    //       url: profile.url
    //     }
    //     }
    })
  ],
  // pages: {
  //   signIn: '/auth/signin',
  //   signOut: '/auth/signout',
  //   error: '/auth/error', // Error code passed in query string as ?error=
  //   verifyRequest: '/auth/verify-request', // (used for check email message)
  //   newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  // },
  debug: true
});


