import NextAuth from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import GitHubProvider from "next-auth/providers/github";
import { getGitHubMembers } from "../../../lib/github";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
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
  secret: process.env.NEXTAUTH_SECRET,
  events: {
    signIn: ({ user, account, profile, isNewUser }) => {
      if (isNewUser) {

        console.log(isNewUser, "isNewuser");

        async function allUsers() {
          let isAllowedToSignInArray;
          try {
            isAllowedToSignInArray = await getGitHubMembers();
          } catch (e) {}
          return isAllowedToSignInArray;
        }

        (async () => {
          const isAllowedToSignInArray = await allUsers();
          if (isAllowedToSignInArray.includes(profile.gh)) {
            console.log("allowed to login");
            return true;
          } else {
            console.log("not allowed to login");
            return false;
          }
        })();
      }
    },
  },
  callbacks: {
    async session({ session, user }) {
      return { ...session, user };
    },
  },
  pages: {
    signIn: "/dashboard",
    newUser: "/signup", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      id: "github",
      name: "GitHub",
      type: "oauth",
      authorization:
        "https://github.com/login/oauth/authorize?scope=read:user+user:email",
      token: "https://github.com/login/oauth/access_token",
      userinfo: {
        url: "https://api.github.com/user",
        async request({ client, tokens }) {
          // Get base profile
          const profile = await client.userinfo(tokens);

          // If user has email hidden, get their primary email from the GitHub API
          if (!profile.email) {
            const emails = await (
              await fetch("https://api.github.com/user/emails", {
                headers: { Authorization: `token ${tokens.access_token}` },
              })
            ).json();

            if (emails?.length > 0) {
              // Get primary email
              profile.email = emails.find((email) => email.primary)?.email;
              // And if for some reason it doesn't exist, just use the first
              if (!profile.email) profile.email = emails[0].email;
            }
          }
          return profile;
        },
      },
      profile(profile) {
        return {
          id: profile.id.toString(),
          gh_id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
          gh: profile.login,
          url: profile.html_url,
        };
      },
    }),
  ],
    theme: {
      colorScheme: "light", // "auto" | "dark" | "light"
      brandColor: "#FF5C35", 
      logo: "https://github.com/CodeTheDream/minfolio/blob/8efbb8e711008d4681d434b6b493788461575349/public/img/CTD-Labs_Primary%5B1%5D.png" // Absolute URL to image
  },
});
