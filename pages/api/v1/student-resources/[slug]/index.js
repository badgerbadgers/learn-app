/**
 * @swagger
 * tags:
 *   name: Student resources
 * /api/v1/studentresource/{slug}:
 *   get:
 *     description: Get a specific student resource by slug
 *     tags: [Student resources]
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
 *                       deleted_at:
 *                         type: string
 *                         format: date #
 *                         example: 2023-04-09T00:56:05.829+00:00
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
        const slug = req.query.slug;
        const staticpage = await getStudentResourcesSlug(slug);
        if (!staticpage) {
          res.status(404).json({ message: `Page not found` });
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
      res.status(405).rendered(`Method ${method} Not Allowed`);
  }
}

export const getStudentResourcesSlug = async (slug) => {
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
