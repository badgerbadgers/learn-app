import React from "react";
import dbConnect from "../../lib/dbConnect";
import { useRouter } from "next/router";
import StaticPage from "../../lib/models/StaticPage";
import { Box } from "@mui/material";
import { PublicLayout } from "../../components/layout/PublicLayout";
import NavBar from "../../components/layout/NavBar";
import Footer from "../../components/layout/Footer";
import axios from "axios";
import { getStaticPageByIsShown } from "pages/api/v1/student-resources";

const Slug = ({ dbPage, content }) => {
  const router = useRouter();
  const slug = router.query.slug;

  return (
    <Box sx={{ width: "75%" }}>
      <h2>{dbPage.title}</h2>
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
  const mongoPages = await getStaticPageByIsShown();
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
  const wordpressPage = await axios.get(
    `https://learn.codethedream.org/wp-json/wp/v2/pages/${mongoPage.wordpress_id}`
  );

  return {
    props: {
      dbPage: JSON.parse(JSON.stringify(mongoPage)),
      content: wordpressPage.data.content.rendered,
      revalidate: 600, // 10 mins
    },
  };
}