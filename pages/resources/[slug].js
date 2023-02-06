import React from "react";
import dbConnect from "../../lib/dbConnect";
import { useRouter } from "next/router";
import StaticPage from "../../lib/models/StaticPage";
import { Box } from "@mui/material";
import { PublicLayout } from "../../components/layout/PublicLayout";
import NavBar from "../../components/layout/NavBar";
import Footer from "../../components/layout/Footer";

const Slug = ({ isShownBySlugMongoPage, content }) => {
  const router = useRouter();
  const slug = router.query.slug;

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

//If a page has Dynamic Routes and uses getStaticProps,
//it needs to define a list of paths to be statically generated.
export async function getStaticPaths() {
  await dbConnect();
  const mongoPages = await StaticPage.find({ isShown: true }).lean();
  const paths = mongoPages.map((page) => {
    return {
      params: { slug: page.slug },
    };
  });

  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
}

export async function getStaticProps(context) {
  await dbConnect();
  const contextSlug = context.params.slug;
  const mongoPage = await StaticPage.findOne({
    slug: contextSlug,
    isShown: true,
  }).lean();

  // fetches specific wp page using wordpress_id
  const res = await fetch(
    `https://learn.codethedream.org/wp-json/wp/v2/pages/${mongoPage.wordpress_id}`
  );
  const wordpressPage = await res.json();

  return {
    props: {
      isShownBySlugMongoPage: JSON.parse(JSON.stringify(mongoPage)),
      content: wordpressPage.content.rendered,
      revalidate: 600, // 10 mins
    },
  };
}
