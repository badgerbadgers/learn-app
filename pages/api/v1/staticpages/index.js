/**
 * @swagger
 * tags:
 *   name: Static Pages
 * /api/v1/staticpages/:
 *   get:
 *     description: Gets all static pages from database
 *     tags: [Static Pages]
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
 *   post:
 *     description: Creates a new static page in database
 *     tags: [Static Pages]
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
 */

import StaticPage from "lib/models/StaticPage";
import dbConnect from "lib/dbConnect";

export default async function handler(req, res) {
  const { method } = req;
  const postData = req.body;

  try {
    switch (method) {
      case "GET":
        const staticpages = await getStaticPages();
        if (!staticpages) {
          return [];
        }
        res.status(200).json({ data: staticpages });
        return;
      case "POST":
        const postData = req.body;
        const staticpage = await createStaticPage(postData);
        res.status(200).json({ data: staticpage });
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
  try {
    await dbConnect();

    const staticpages = await StaticPage.find({});
    return staticpages;
  } catch (error) {
    throw new Error("Error getting static pages", error.message);
  }
  return staticpages;
};

export const createStaticPage = async (staticpage) => {
  try {
    await dbConnect();

    const existingWordPressId = await StaticPage.findOne({
      wordpress_id: staticpage.wordpress_id,
    });

    if (existingWordPressId) {
      throw new Error(
        `Static page with wordpress_id ${staticpage.wordpress_id} already exists.`
      );
    }

    const newstaticpage = new StaticPage(staticpage);
    await newstaticpage.save();
    return newstaticpage;
  } catch (error) {
    //gives specific error message
    throw new Error(error.message);
  }
};