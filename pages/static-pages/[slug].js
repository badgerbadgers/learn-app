import Link from "next/link";
import { useRouter } from "next/router";
import StaticPage from "../../lib/models/StaticPage";
import dbConnect from "../../lib/dbConnect";
import { getSession } from "next-auth/react";

const Pages = ({ mongoPages }) => {
  // console.log("mongo pages", mongoPages);
  const router = useRouter();
  const { slug } = router.query;
  return (
    <div>
      <p>Post: {slug}</p>
      {/* <h2>WordPress Pages</h2> */}
      {/* <ul>
        {mongoPages.map((page) => {
          return (
            <li key={page._id + ""}>
              <Link href={`/static-pages/${page.wordpress_id}`} key={page._id}>
                <a>{page.title}</a>
              </Link>
            </li>
          );
        })}
      </ul> */}
    </div>
  );
};
export default Pages;

export async function getServerSideProps(context) {
  await dbConnect();

  const session = await getSession(context);
  const mongoData = await StaticPage.find({}).lean();
  // Fetch data from external API
  // const res = await fetch(`https://learn.codethedream.org/wp-json/wp/v2/pages`);
  // const data = await res.json();
  console.log("mongo", mongoData);

  // Pass data to the page via props
  return {
    props: {
      mongoPages: JSON.parse(JSON.stringify(mongoData)),
    },
  };
}
