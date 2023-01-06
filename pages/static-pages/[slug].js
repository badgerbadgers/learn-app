import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";
import StaticPage from "../../lib/models/StaticPage";
import dbConnect from "../../lib/dbConnect";
import { getSession } from "next-auth/react";

const Pages = ({ mongoPages, combinedData }) => {
  const [newPages, setNewPages] = useState(combinedData);
  console.log("new pages", newPages);
  const router = useRouter();
  //pulling id not slug need to fix
  const { slug } = router.query;
  const numSlug = Number(slug);
  console.log(typeof numSlug);
  // console.log(slug);
  // console.log(typeof mongoPages[0].wordpress_id);
  //reference for filter used in array iteration located in jsx statement
  const filtered = mongoPages.filter((item) => item.wordpress_id === numSlug);
  console.log("filtered", filtered);
  return (
    <div>
      <p>Post: {slug}</p>
      {/* <h2>WordPress Pages</h2> */}
      <ul>
        {mongoPages.map((page) => {
          if (page.wordpress_id === Number(slug)) {
            return <div key={page._id}>{page.title}</div>;
          }
          // returns all pages
          // return (
          //   <li key={page._id + ""}>
          //     <Link href={`/static-pages/${page.wordpress_id}`} key={page._id}>
          //       <a>{page.title}</a>
          //     </Link>
          //   </li>
          // );
        })}
        {/* {mongoPages.filter((page) => {
          if (page.wordpress_id === numSlug) {
            return (
              <li key={page._id + ""}>
                <Link
                  href={`/static-pages/${page.wordpress_id}`}
                  key={page._id}
                >
                  <a>{page.title}</a>
                </Link>
              </li>
            );
          }
        })} */}
      </ul>
    </div>
  );
};
export default Pages;

export async function getServerSideProps(context) {
  await dbConnect();

  const session = await getSession(context);
  const mongoData = await StaticPage.find({}).lean();
  // Fetch data from external API
  const res = await fetch(`https://learn.codethedream.org/wp-json/wp/v2/pages`);
  const wordpressData = await res.json();
  // console.log("wpdata", data);
  // console.log("mongo", mongoData);
  //from wordpress pages need:
  //data.content.rendered string
  //data.meta(seo?)
  //data.slug
  //data.excerpt.rendered
  //data.wp.attachment

  const combinedData = combineData(wordpressData, mongoData);
  console.log("combined", combinedData);
  // Pass data to the page via props
  return {
    props: {
      mongoPages: JSON.parse(JSON.stringify(mongoData)),
      // wpPages: JSON.parse(JSON.stringify(data)),
      combinedData: JSON.parse(JSON.stringify(combinedData)),
    },
  };
}

//need to refactor only create combined object if wordpressData property exists in mongoData (ie slug matches and exists in mongoData)
function combineData(wordpressData, mongoData) {
  const combinedData = [];
  wordpressData.forEach((wpitem) => {
    const combinedObj = {
      content: wpitem.content.rendered,
      excerpt: wpitem.excerpt.rendered,
      // attachment: wpitem.wp.attachment,
      title: wpitem.title.rendered,
      slug: wpitem.slug,
      mongo_id: null,
    };
    let item = mongoData.find(
      (mongoitem) => wpitem.id === mongoitem.wordpress_id
    );
    if (item) {
      combinedObj.mongo_id = item._id + "";
    }
    combinedData.push(combinedObj);
  });
  return combinedData;
}
