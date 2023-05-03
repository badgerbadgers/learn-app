/**
 * @swagger
 * tags:
 *   name: Static pages
 * /api/v1/staticpages/{id_or_slug}:
 *   get:
 *     description: Get a specific static page by slug
 *     tags: [Static pages]
 *     parameters:
 *       - in: path
 *         name: id_or_slug
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
 *   patch:
 *     description: Updates a static page in database using the id
 *     tags: [Static pages]
 *     parameters:
 *       - in: path
 *         name: id_or_slug
 *         schema:
 *           type: number
 *           example: 63fd39c51e0a85c4749274ff
 *         description: id of the static page to update
 *       - in: body
 *         name: data
 *         schema:
 *           type: object
 *           properties:
 *             wordpress_id:
 *               type: number
 *             isShown:
 *               type: boolean
 *               example: true
 *             slug:
 *               type: string
 *             title:
 *               type: string
 *         description: the updated static page object when PATCH request is called
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
    case "GET":
      try {
        const slug = req.query.id_or_slug;
        const staticpage = await getStaticPageSlug(slug);
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
    case "PATCH":
      try {
        const id = req.query.id_or_slug;
        const updates = req.body;

        const updatedPage = await updateStaticPage(id, updates);
        res.status(200).json({ data: updatedPage });
        return;
      } catch (error) {
        res.status(400).json({ message: error.message });
        return;
      }
    case "DELETE":
      try {
        const id = req.query.id_or_slug;
        await deletedStaticPage(id);
        res.status(200).json({ message: `Page has been deleted.` });
        return;
      } catch (error) {
        res.status(400).json({ message: error.message });
        return;
      }
    default:
      res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
      res.status(405).rendered(`Method ${method} Not Allowed`);
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

export const updateStaticPage = async (id, updates) => {
  try {
    await dbConnect();
    const updatedstaticpage = await StaticPage.findByIdAndUpdate(id, updates, {
      runValidators: true,
      new: true,
    });
    //run validators on new obj
    if (!updatedstaticpage) {
      throw new Error(`${id} is not a valid id.`);
    }
    return updatedstaticpage;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

export const deletedStaticPage = async (id) => {
  const update = { deleted_at: new Date() };
  try {
    await dbConnect();
    const deletedPage = await StaticPage.findByIdAndUpdate(id, update);
    if (!deletedPage) {
      throw new Error(`Could not find ${id}`);
    }
    return;
  } catch (error) {
    console.log(error);
    throw new Error(`Could not delete by id: ${error.message}`);
  }
};