/**
 * @swagger
 * tags:
 *   name: Student Resources
 * /api/v1/student-resources/{slug}:
 *   get:
 *     description: Get a specific student resource by slug
 *     tags: [Student Resources]
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
 *         description: Error messages
 *       404:
 *         description: Error message if slug of student resource is not found
 *
 */

import StaticPage from "lib/models/StaticPage";
import dbConnect from "lib/dbConnect";
export default async function handler(req, res) {
  const { method } = req;
  const slug = req.query.slug;

  try {
    switch (method) {
      case "GET":
        const studentresource = await getStudentResourcesSlug(slug);
        if (!studentresource) {
          const error = new Error();
          error.status = 404;
          error.message = `Could not find student resource, ${slug} is invalid`;
          throw error;
        }
        res.status(200).json({ data: studentresource });
        return;
      default:
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.log(error);
    res.status(error.status || 400).json({ message: error.message });
  }
}

export const getStudentResourcesSlug = async (slug) => {
  await dbConnect();
  const studentResourceSlug = await StaticPage.findOne({
    slug: slug,
    isShown: true,
  }).exec();

  if (!studentResourceSlug) {
    return null;
  }
  return studentResourceSlug;
};
