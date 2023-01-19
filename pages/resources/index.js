import React, { useState } from "react";
import {
  Typography,
  // Box,
  // List,
  // ListItem,
  // ListItemButton,
  // ListItemIcon,
  // ListItemText,
  // Divider,
  // InboxIcon,
  // DraftsIcon,
} from "@mui/material";
import StaticPage from "../../lib/models/StaticPage";
import dbConnect from "../../lib/dbConnect";
import { getSession } from "next-auth/react";
import { PublicLayout } from "../../components/layout/PublicLayout";
import NavBar from "../../components/layout/NavBar";
import Footer from "../../components/layout/Footer";
import Link from "next/link";
import { useRouter } from "next/router";

const IsShownResourcePages = ({ shownPages }) => {
  const [shownStaticPages, setShownStaticPages] = useState(shownPages);
  console.log("shownstaticpages", shownStaticPages);
  // const router = useRouter();
  // const slug = router.query.slug;
  // console.log("router slug", slug);

  return (
    <div>
      <Typography variant="h5" gutterBottom color="primary">
        Resources
      </Typography>
      {shownStaticPages.map((page) => {
        return (
          <div key={page._id}>
            {/* <Link href={`/resources/${encodeURIComponent(page.slug)}`}> */}
            <Link href={`/resources/` + `${page.slug}`}>
              <a>{page.title}</a>
              {/* <a>{page._id}</a> */}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default IsShownResourcePages;

IsShownResourcePages.getLayout = function getLayout(pages) {
  return (
    <>
      <NavBar />
      <PublicLayout>{pages}</PublicLayout>
      <Footer />
    </>
  );
};

export async function getServerSideProps(context) {
  console.log("context", context);
  await dbConnect();
  const contextSlug = context.query.slug;
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const { user } = session;
  if (!user.hasProfile) {
    return {
      redirect: {
        destination: "/signup",
        permanent: false,
      },
    };
  }
  const isShownMongoPages = await StaticPage.find({
    isShown: true,
    // slug: contextSlug,
  });
  console.log("is shown pages", isShownMongoPages);
  // const mongoPage = await StaticPage.findOne({
  //   slug: contextSlug,
  // }).lean();
  // console.log("wp slug", mongoPage);

  return {
    props: {
      shownPages: JSON.parse(JSON.stringify(isShownMongoPages)),
      // content: wordpressPage.content.rendered,
    },
  };
}
