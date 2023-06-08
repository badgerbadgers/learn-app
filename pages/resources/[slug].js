import React from "react";
import { Box } from "@mui/material";
import { PublicLayout } from "../../components/layout/PublicLayout";
import NavBar from "../../components/layout/NavBar";
import Footer from "../../components/layout/Footer";
import axios from "axios";
import { getStudentResourcesByIsShown } from "pages/api/v1/student-resources";
import { getStudentResourcesSlug } from "pages/api/v1/student-resources/[slug]";

const Slug = ({ dbPage, content }) => {
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
  const mongoPages = await getStudentResourcesByIsShown();
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
  const contextSlug = context.params.slug;
  const mongoPage = await getStudentResourcesSlug(contextSlug);

  // fetches specific wp page using wordpress_id
  const wordpressPage = await axios.get(
    process.env.wordpressUrl + mongoPage.wordpress_id
  );

  return {
    props: {
      dbPage: JSON.parse(JSON.stringify(mongoPage)),
      content: wordpressPage.data.content.rendered,
      revalidate: 600, // 10 mins
    },
  };
}
