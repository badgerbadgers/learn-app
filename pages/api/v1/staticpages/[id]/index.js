/**
 * @swagger
 * tags:
 *   name: Static pages
 * /api/v1/staticpages/{id}:
 *   get:
 *     description: Get a specific static page by id
 *     tags: [Static pages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         example: 
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
 *         description: Error messages if id cannot be found
 *   patch:
 *     description: Updates a static page in database using the id
 *     tags: [Static pages]
 *     parameters:
 *       - in: path
 *         name: id
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
 *       404:
 *         description: Error messages if id cannot be found
 *   delete:
 *     description: Soft deletes a static page in database using the id
 *     tags: [Static pages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *           example: 63fd39c51e0a85c4749274ff
 *         description: id of the static page to soft delete
 *       - in: body
 *         schema:
 *           type: object
 *           properties:
 *             deleted_at:
 *               type: string
 *               format: date #
 *               example: 2023-04-09T00:56:05.829+00:00
 *             isShown:
 *               type: boolean
 *               example: true
 *             slug:
 *               type: string
 *             title:
 *               type: string
 *         description: the result object when DELETE is called
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
 *                     deleted_at:
 *                       type: string #
 *                       example: 2023-04-09T00:56:05.829+00:00
 *       400:
 *         description: Error messages
 *       404:
 *         description: Error message if the id cannot be found
 *
 */

import StaticPage from "lib/models/StaticPage";
import dbConnect from "lib/dbConnect";

export default async function handler(req, res) {
  const { method } = req;
  const id = req.query.id;
  const updates = req.body;

  try {
    switch (method) {
      case "GET":
        const staticpage = await getStaticPageById(id);
        if (!staticpage) {
          const error = new Error();
          error.status = 404;
          error.message = `Could not find static page, id:${id} is invalid`;
          throw error;
        }
        res.status(200).json({ data: staticpage });
        return;
      case "PATCH":
        const updatedPage = await updateStaticPage(id, updates);
        if (!updatedPage) {
          const error = new Error();
          error.status = 404;
          error.message = `Could not update static page, id:${id} is invalid`;
        }
        res.status(200).json({ data: updatedPage });
        return;
      case "DELETE":
        const deletedPage = await deletedStaticPage(id);
        if (!deletedPage) {
          const error = new Error();
          error.status = 404;
          error.message = `Could not delete static page, id:${id} is invalid`;
        }
        res
          .status(200)
          .json({ message: `Page with id:${id} has been deleted.` });
        return;
      default:
        res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.log(error);
    res.status(error.status || 400).json({ message: error.message });
  }
}

export const getStaticPageById = async (id) => {
  await dbConnect();
  const staticPageId = await StaticPage.findOne({
    _id: id,
  }).exec();
  if (!staticPageId) {
    return null;
  }
  return staticPageId;
};

export const updateStaticPage = async (id, updates) => {
  await dbConnect();
  const updatedstaticpage = await StaticPage.findByIdAndUpdate(id, updates, {
    runValidators: true,
    new: true,
  });
  if (!updatedstaticpage) {
    return null;
  }
  return updatedstaticpage;
};

export const deletedStaticPage = async (id) => {
  const update = { deleted_at: new Date() };
  await dbConnect();
  const deletedPage = await StaticPage.findByIdAndUpdate(id, update);
  if (!deletedPage) {
    return null;
  }
  return deletedPage;
};
