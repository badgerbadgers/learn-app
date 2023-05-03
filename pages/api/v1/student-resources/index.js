/**
 * @swagger
 * tags:
 *   name: Student Resources
 * /api/v1/student-resources:
 *   get:
 *     description: Gets all student resources with boolean isShown equal to true
 *     tags: [Student Resources]
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
        const staticpage = await getStaticPageByIsShown();
        if (!staticpage) {
          res.status(404).json({
            message: `Error getting static pages`,
          });
          return; 
        }
        res.status(200).json({ data: staticpage });
        return; 
      } catch (error) {
        res.status(400).json({ message: error.message });
        return; 
      }
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allow`);
  }
}

export const getStaticPageByIsShown = async () => {
  try {
    await dbConnect();
    const staticPagesShown = await StaticPage.find({
      isShown: true,
    });

    return staticPagesShown;
  } catch (error) {
    throw new Error(error.message);
  }
};
