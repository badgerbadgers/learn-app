import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";
import StaticPage from "../../lib/models/StaticPage";
import dbConnect from "../../lib/dbConnect";
import { getSession } from "next-auth/react";

//use the slug will be string when comparing to other strings no need to convert
const Pages = ({ wordpressPage, title, content }) => {
  // const [newPages, setNewPages] = useState(combinedData);
  // console.log("mongo slug", mongoPageSlug);
  // console.log("new pages", newPages);
  console.log("wordpress page", wordpressPage);
  console.log("title", title);
  const router = useRouter();
  // const { slug } = router.query;

  return (
    <div>
      <h2>{title}</h2>
      <p>slug: {wordpressPage.slug}</p>
      <p>{content}</p>
    </div>
  );
};
export default Pages;

export async function getServerSideProps(context) {
  await dbConnect();
  console.log(context);
  const contextSlug = context.query.slug;
  console.log("context slug", contextSlug);
  const session = await getSession(context);

  //update 1/10:
  //no square brackets in slug(x)
  //validate that real doc is found not empty result(x)
  //if empty redirect to 404 (x)
  //to redirect to 404 in getserversideprops, link (x)

  //next steps:
  //hit api on wp for this static page, use front or backend?
  //backend: page will take longer, waits for call and res
  //frontend: load empty(loading screen), do api call wp get then display
  //backend staticprops and cache it?/use getstaticprops later after getserversideprops works

  //fetch will be refactored fetch one page:
  //add specific url in fetch grab specific page (https://learn.codethedream.org/wp-json/wp/v2/pages/369) (use wpid) (x)
  //just gets content, parse? might display (unescape characters)
  //content.rendered send this as a prop
  //send to component
  //then display it
  const mongoPage = await StaticPage.findOne({
    slug: contextSlug,
  }).lean();
  console.log("mongoPage wp id", mongoPage.wordpress_id);
  // console.log("mongoData", mongoData);

  // fetches specific wp page using wp-id
  const res = await fetch(
    `https://learn.codethedream.org/wp-json/wp/v2/pages/${mongoPage.wordpress_id}`
  );
  const wordpressPage = await res.json();
  console.log("wp page", wordpressPage);

  //The notFound boolean allows the page to return a 404 status and 404 Page
  if (!wordpressPage) {
    return {
      notFound: true,
    };
  }
  // console.log("wpdata", wordpressData);
  // console.log("mongo", mongoData);

  // console.log("combined", combinedData);

  // Pass data to the page via props
  return {
    props: {
      title: wordpressPage.title.rendered,
      content: wordpressPage.content.rendered,
      // res: JSON.parse(JSON.stringify(res)),
      wordpressPage: JSON.parse(JSON.stringify(wordpressPage)),
      // mongoPages: JSON.parse(JSON.stringify(mongoData)),
      // wpPages: JSON.parse(JSON.stringify(data)),
      // combinedData: JSON.parse(JSON.stringify(combinedData)),
      // mongoPageSlug: JSON.parse(JSON.stringify(mongoPage.slug)),
    },
  };
}
