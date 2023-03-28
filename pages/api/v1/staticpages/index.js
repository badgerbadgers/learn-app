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
 *          type: string
 *          required: false
 *        - name: slug
 *          type: string
 *          required: false
 *        - name: isShown
 *          type: boolean
 *          required: false
 *          schema:
 *            default: null
 *          allowEmptyValue: false
 *        - name: wordpress_id
 *          required: false
 *          schema:
 *            type: integer
 *          allowEmptyValue: false
 *     responses:
 *       200:
 *         description: Get static pages
 *       400:
 *         description: Error messages
 *   post:
 *     description: Creates a new static page
 *     tags: [Static pages]
 *     parameters:
 *       - name: title
 *         type: string
 *         required: false
 *       - name: slug
 *         type: string
 *         required: false
 *       - name: wordpress_id
 *         required: false
 *         schema:
 *           type: integer
 *       - name: isShown
 *         type: boolean
 *         required: false
 *         allowEmptyValue: false
 *     responses:
 *       200:
 *         description: Created a new static page
 *       400:
 *         description: Error messages
 *  
 */

import Staticpage from "/lib/models/StaticPage";
import dbConnect from "lib/dbConnect";

export default async function handler(req, res) {
  // console.log("req", req);
  console.log("res", res);
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const staticpages = await getStaticPages();
        res.status(200).json({ data: staticpages });
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false });
      }
      return;
    case "POST":
      try {
        //creates a static page if it exist
        const staticpage = await createStaticPage(req.body);
        res.status(200).json({ data: staticpage });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
      return;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export const getStaticPages = async () => {
  try {
    await dbConnect();

    const staticpages = await Staticpage.find().exec();
    return staticpages;
  } catch (error) {
    console.error(error);
  }
};

export const createStaticPage = async (data) => {
  let staticpage = {
    wordpress_id: data.wordpress_id,
    title: data.title,
    isShown: data.isShown,
    slug: data.slug,
  };
  try {
    await dbConnect();
    //create new static page with properties
    const newstaticpage = await Staticpage.create(staticpage);
    return newstaticpage;
  } catch (error) {
    console.log(error, "cant create new static page");
  }
};