import React from "react";
import dbConnect from "../../lib/dbConnect";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import StaticPage from "../../lib/models/StaticPage";
import { Box } from "@mui/material";
import { PublicLayout } from "../../components/layout/PublicLayout";
import NavBar from "../../components/layout/NavBar";
import Footer from "../../components/layout/Footer";

const Slug = ({ isShownBySlugMongoPage, content }) => {
  const router = useRouter();
  const slug = router.query.slug;
  console.log("router slug", slug);
  console.log("isShownBySlugMongoPage", isShownBySlugMongoPage);
  console.log("content", content);
  return (
    <Box sx={{ width: "75%" }}>
      <h2>{isShownBySlugMongoPage.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </Box>
  );
};

export default Slug;

Slug.getLayout = function getLayout(pages) {
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
  // const isShownMongoPages = await StaticPage.find({
  //   isShown: true,
  //   slug: contextSlug,
  // });
  // console.log("is shown pages", isShownMongoPages);
  const mongoPage = await StaticPage.findOne({
    slug: contextSlug,
  }).lean();
  console.log("wp slug", mongoPage);

  // fetches specific wp page using wordpress_id
  const res = await fetch(
    `https://learn.codethedream.org/wp-json/wp/v2/pages/${mongoPage.wordpress_id}`
  );
  const wordpressPage = await res.json();
  console.log("wp", wordpressPage);
  return {
    props: {
      isShownBySlugMongoPage: JSON.parse(JSON.stringify(mongoPage)),
      content: wordpressPage.content.rendered,
    },
  };
}
