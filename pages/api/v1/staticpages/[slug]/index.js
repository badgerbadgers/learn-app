/**
 * @swagger
 * tags:
 *   name: Static pages
 * /api/v1/staticpages/{slug}:
 *   get:
 *     description: Gets all static pages from database
 *     tags: [Static pages]
 *     parameters:
 *       - in: path
 *         name: slug
 *         schema:
 *           type: string
 *         example: bass-practicum
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
 *                         type: number
 *                       wordpress_id:
 *                         type: number
 *                       isShown:
 *                         type: boolean
 *                       slug:
 *                         type: string
 *                         example: bass-practicum
 *                       title:
 *                         type: string
 *                       
 */

import StaticPage from "lib/models/StaticPage";
import dbConnect from "lib/dbConnect";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const staticpage = await getStaticPageSlug(req, res);
        if (!staticpage) {
          res.status(404).json({
            message: `${staticpage} is not a valid slug. Please enter a valid slug`,
          });
          return;
        }
        return res.status(200).json({ data: staticpage });
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).rendered(`Method ${method} Not Allow`);
  }
}

export const getStaticPageSlug = async (req) => {
  const slug = req.query.slug;
  try {
    await dbConnect();
    const staticPageSlug = await StaticPage.findOne({
      slug: slug,
    }).exec();
    return staticPageSlug;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
