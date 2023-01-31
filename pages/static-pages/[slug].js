import { Box } from "@mui/material";
import StaticPage from "../../lib/models/StaticPage";
import dbConnect from "../../lib/dbConnect";
import { PublicLayout } from "../../components/layout/PublicLayout";
import NavBar from "../../components/layout/NavBar";
import Footer from "../../components/layout/Footer";
import { getSession } from "next-auth/react";

const WordPressStaticPage = ({ title, content }) => {
  return (
    <Box sx={{ width: "75%" }}>
      <h2>{title}</h2>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </Box>
  );
};
export default WordPressStaticPage;

WordPressStaticPage.getLayout = function getLayout(pages) {
  return (
    <>
      <NavBar />
      <PublicLayout>{pages}</PublicLayout>
      <Footer />
    </>
  );
};

export async function getServerSideProps(context) {
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

  const mongoPage = await StaticPage.findOne({
    slug: contextSlug,
  }).lean();

  //The notFound boolean allows the page to return a 404 status
  if (!mongoPage || mongoPage.isShown === false) {
    return {
      notFound: true,
    };
  }
  // fetches specific wp page using wordpress_id
  const res = await fetch(process.env.wordpressDomain + mongoPage.wordpress_id);
  const wordpressPage = await res.json();

  // Pass data to the page via props
  return {
    props: {
      title: wordpressPage.title.rendered,
      content: wordpressPage.content.rendered,
    },
  };
}
