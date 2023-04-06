/**
 * @swagger
 * tags:
 *   name: Static pages
 * /api/v1/staticpages/{id}:
 *   patch:
 *     description: Updates a static page in database using the id
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
 *                       example: 8686
 *                     isShown:
 *                       type: boolean
 *                       example: false
 *                     slug:
 *                       type: string
 *                       example: resilient-canary
 *                     title:
 *                       type: string
 *                       example: Resilient Canary
 *       400:
 *         description: Error messages
 *
 */

import StaticPage from "lib/models/StaticPage";
import dbConnect from "lib/dbConnect";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "PATCH":
      try {
        const staticpage = await updateStaticPage(req, res);
        return res.status(200).json({ data: req.body });
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
    // case "DELETE":
    //   try {

    //   }
    default:
      res.setHeader("Allow", ["PATCH"]);
      res.status(405).rendered(`Method ${method} Not Allowed`);
  }
}

export const updateStaticPage = async (req) => {
  const id = req.query.id;
  const updatedData = req.body;

  try {
    await dbConnect();
    const updatedstaticpage = await StaticPage.findByIdAndUpdate(id, {
      wordpress_id: updatedData.wordpress_id,
      isShown: updatedData.isShown,
      slug: updatedData.slug,
      title: updatedData.title,
    });
    if (!updatedstaticpage) {
      throw new Error(`${id} is not a valid id.`);
    }
    return updatedstaticpage;
  } catch (error) {
    console.log(error);
    throw new Error(`${error.message}`);
  }
};
