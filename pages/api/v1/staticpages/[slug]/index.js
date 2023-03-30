/**
 * @swagger
 * tags:
 *   name: Static pages
 * /api/v1/staticpages/{slug}:
 *   get:
 *     description: Gets all static pages
 *     tags: [Static pages]
 *     parameters:
 *        - name: title
 *          required: false
 *          schema:
 *            type: string
 *        - name: slug
 *          required: false
 *          schema:
 *            type: string
 *        - name: isShown
 *          required: false
 *          schema:
 *            type: boolean
 *          allowEmptyValue: false
 *          example: true, false
 *        - name: wordpress_id
 *          schema:
 *            type: number
 *          allowEmptyValue: true
 *     responses:
 *       200:
 *         description: Get static pages
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isShown:
 *                   type: boolean
 *                   description: bool to show page
 *                 wordpress_id:
 *                   type: number
 *                   description: static page id
 *                 slug:
 *                   type: string
 *                   description: static page slug
 *                 title:
 *                   type: string
 *                   description: static page title
 *       400:
 *         description: Error messages
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
        res.status(200).json({ data: staticpage });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
      return;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).rendered(`Method ${method} Not Allow`);
  }
}

export const getStaticPageSlug = async (req) => {
  const slug = req.body.slug;

  try {
    const staticPageSlug = await StaticPage.findOne({
      slug: slug,
    }).lean();
    return staticPageSlug;
  } catch (error) {
    console.log(error);
  }
};
