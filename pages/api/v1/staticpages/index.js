/**
 * @swagger
 * tags:
 *   name: Static pages
 * /api/v1/staticpages:
 *   get:
 *     description: Gets all static pages from database
 *     tags: [Static pages]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 75ge23c42f9b73c474826693
 *                       wordpress_id:
 *                         type: number
 *                         example: 4232
 *                       isShown:
 *                         type: boolean
 *                         example: false
 *                       slug:
 *                         type: string
 *                         example: giraffe-intro
 *                       title:
 *                         type: string
 *                         example: Giraffe Intro
 *       400:
 *         description: Error messages
 *       404:
 *         description: Error message if static pages are not found                
 *   post:
 *     description: Creates a new static page in database
 *     tags: [Static pages]
 *     parameters:
 *       - in: query
 *         name: wordpress_id
 *         schema:
 *           type: number
 *         required: true
 *         
 *       - in: query
 *         name: isShown
 *         schema:
 *           type: boolean
 *         example: true
 *       - in: query
 *         name: slug
 *         schema:
 *           type: string
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     wordpress_id:
 *                       type: number
 *                       example: 2999
 *                     isShown:
 *                       type: boolean
 *                       example: true
 *                     slug:
 *                       type: string
 *                       example: bright-dolphin
 *                     title:
 *                       type: string
 *                       example: Bright Dolphin
 *       400:
 *         description: Error messages
 *       404:
 *         description: Error messages if static page id is invalid
 */

import Staticpage from "/lib/models/StaticPage";
import dbConnect from "lib/dbConnect";

export default async function handler(req, res) {
  const { method } = req;
  const postData = req.body;

  try {
    switch (method) {
      case "GET":
        const staticpages = await getStaticPages();
        if (!staticpages) {
          const error = newError();
          error.status = 404;
          error.message = `Could not find static page`;
        }
        res.status(200).json({ staticpages });
        return;
      case "POST":
        const newstaticpage = await createStaticPage(postData);
        if (!newstaticpage) {
          const error = new Error();
          error.status = 404;
          error.message = `Cannot create new static page`;
          throw error;
        }
        res.status(200).json({ data: newstaticpage });
        return;
      default:
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.log(error);
    res.status(error.status || 400).json({ message: error.message });
  }
}

export const getStaticPages = async () => {
  await dbConnect();
  const staticpages = await Staticpage.find({});
  if (!staticpages) {
    return null;
  }
  return staticpages;
};

export const createStaticPage = async (staticpage) => {
  await dbConnect();
  const newstaticpage = new Staticpage(staticpage);
  if (!newstaticpage) {
    return null;
  }
  await newstaticpage.save();
  return newstaticpage;
};