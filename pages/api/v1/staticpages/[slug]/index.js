/**
 * @swagger
 * tags:
 *   name: Static pages
 * /api/v1/staticpages/{slug}:
 *   get:
 *     description: Get a specific static page by slug
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
 *                         example: 63fd39c51e0a85c474927702
 *                       wordpress_id:
 *                         type: number
 *                         example: 2334
 *                       isShown:
 *                         type: boolean
 *                         example: true
 *                       slug:
 *                         type: string
 *                         example: grasshopper-rails
 *                       title:
 *                         type: string
 *                         example: Grasshopper Rails
 *                       
 */

import StaticPage from "lib/models/StaticPage";
import dbConnect from "lib/dbConnect";

export default async function handler(req, res) {
  const { method } = req;
  const slug = req.query.slug;
  switch (method) {
    case "GET":
      try {
        const staticpage = await getStaticPageSlug(slug);
        if (!staticpage) {
          res.status(404).json({ message: `Page not found` });
        }
        res.status(200).json({ data: staticpage });
        return;
      } catch (error) {
        res.status(400).json({ message: error.message });
        return;
      }
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).rendered(`Method ${method} Not Allow`);
  }
}

export const getStaticPageSlug = async (slug) => {
  try {
    await dbConnect();
    const staticPageSlug = await StaticPage.findOne({
      slug: slug,
      isShown: true,
    }).exec();
    return staticPageSlug;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
