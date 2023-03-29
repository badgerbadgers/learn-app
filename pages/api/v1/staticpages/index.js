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

import Staticpage from "/lib/models/StaticPage";
import dbConnect from "lib/dbConnect";

export default async function handler(req, res) {
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
  const staticpage = {
    wordpress_id: data.wordpress_id,
    title: data.title,
    isShown: data.isShown,
    slug: data.slug,
  };
  try {
    await dbConnect();
    //create new static page with properties
    // const newstaticpage = await Staticpage.create(staticpage);
    const newstaticpage = new Staticpage(staticpage);
    await newstaticpage.save();
    return newstaticpage;
  } catch (error) {
    console.log(error, "cant create new static page");
  }
};