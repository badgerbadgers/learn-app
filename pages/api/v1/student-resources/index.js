/**
 * @swagger
 * tags:
 *   name: Static pages
 * /api/v1/student-resources:
 *   get:
 *     description: Gets all static pages with boolean isShown equal to true
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

  switch (method) {
    case "GET":
      try {
        const staticpage = await getStaticPageByIsShown(req, res);
        if (!staticpage) {
          return res.status(404).json({
            message: `Error getting static pages`,
          });
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

export const getStaticPageByIsShown = async () => {
  try {
    await dbConnect();
    const staticPagesShown = await StaticPage.find({
      isShown: true,
    });
    if (!staticPagesShown) {
      throw new Error("No static pages can be found");
    }
    return staticPagesShown;
  } catch (error) {
    throw new Error(error.message);
  }
};
