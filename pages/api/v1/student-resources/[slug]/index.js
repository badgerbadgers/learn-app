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
 *       400:
 *         description: error messages
 *       404:
 *         description: error messages
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
        res.status(200).json({ data: staticpage });
        return;
      } catch (error) {
        console.error(error);
        res.status(error.status || 400).json({ message: error.message });
        return;
      }
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export const getStudentResourcesSlug = async (slug) => {
  await dbConnect();
  const studentResourceSlug = await StaticPage.findOne({
    slug: slug,
    isShown: true,
  }).exec();
  if (!studentResourceSlug) {
    const error = new Error();
    error.status = 404;
    error.message = `Error finding slug - ${slug} is invalid`;
    throw error;
  }
  return studentResourceSlug;
};
