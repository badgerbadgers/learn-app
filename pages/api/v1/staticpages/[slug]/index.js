/**
 * @swagger
 * tags:
 *   name: Static pages
 * /api/v1/staticpages:
 *   get:
 *     description: Gets all static pages
 *     tags: [Static pages]
 *     parameters:
 *        - name: title
 *          required: false
 *          schema:
 *            type: string
 *        - name: slug
 *          required: false
 *          schema:
 *            type: string
 *        - name: isShown
 *          required: false
 *          schema:
 *            type: boolean
 *          allowEmptyValue: false
 *          example: true, false
 *        - name: wordpress_id
 *          required: true
 *          schema:
 *            type: number
 *          allowEmptyValue: true
 *     responses:
 *       200:
 *         description: Get static pages
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isShown:
 *                   type: boolean
 *                   description: bool to show page
 *                 wordpress_id:
 *                   type: number
 *                   description: static page id
 *                 slug:
 *                   type: string
 *                   description: static page slug
 *                 title:
 *                   type: string
 *                   description: static page title
 *       400:
 *         description: Error messages
 *   post:
 *     description: Creates a new static page
 *     tags: [Static pages]
 *     parameters:
 *       - name: title
 *         required: false
 *         schema:
 *           type: string
 *       - name: slug
 *         required: false
 *         schema:
 *           type: string
 *       - name: wordpress_id
 *         schema:
 *           type: number
 *       - name: isShown
 *         required: false
 *         schema:
 *           type: boolean
 *         allowEmptyValue: false
 *     responses:
 *       200:
 *         description: ok
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isShown:
 *                   type: boolean
 *                   description: boolean to show page in app
 *                 wordpress_id:
 *                   type: integer
 *                   description: static page id
 *                 slug:
 *                   type: string
 *                   description: static page slug
 *                 title:
 *                   type: string
 *                   description: static page title
 *       400:
 *         description: Error messages
 *
 */

import StaticPage from "lib/models/StaticPage";
import dbConnect from "lib/dbConnect";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const staticpage = await getStaticPageSlug(req.query);
        res.status(200).json({ data: staticpage });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
      return;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).rendered(`Method ${method} Not Allow`);
  }
}

export const getStaticPageSlug = async;

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
  const wordpressPage = await axios.get(
    process.env.wordpressUrl + mongoPage.wordpress_id
  );

  // Pass data to the page via props
  return {
    props: {
      title: wordpressPage.data.title.rendered,
      content: wordpressPage.data.content.rendered,
    },
  };
}
