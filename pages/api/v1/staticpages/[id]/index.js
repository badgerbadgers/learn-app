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
 *
 */

import StaticPage from "lib/models/StaticPage";
import dbConnect from "lib/dbConnect";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const id = req.query.id;
        const staticpage = await getStaticPageById(id);
        res.status(200).json({ data: staticpage });
        return;
      } catch (error) {
        console.error(error);
        res.status(error.status || 400).json({ message: error.message });
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
        console.error(error);
        res.status(error.status || 400).json({ message: error.message });
        return;
      }
    case "DELETE":
      try {
        const id = req.query.id;
        await deletedStaticPage(id);
        res.status(200).json({ message: `Page has been deleted.` });
        return;
      } catch (error) {
        console.error(error);
        res.status(error.status || 400).json({ message: error.message });
        return;
      }
    default:
      res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export const getStaticPageById = async (id) => {
  await dbConnect();
  const staticPageId = await StaticPage.findOne({
    _id: id,
  }).exec();
  if (!staticPageId) {
    const error = new Error();
    error.status = 404;
    error.message = `Error finding id - ${id} is invalid`;
    throw error;
  }
  return staticPageId;
};

export const updateStaticPage = async (id, updates) => {
  await dbConnect();
  const updatedstaticpage = await StaticPage.findByIdAndUpdate(id, updates, {
    runValidators: true,
    new: true,
  });
  //run validators on new obj
  if (!updatedstaticpage) {
    // throw new Error(`${id} is not a valid id.`);
    const error = new Error();
    error.status = 404;
    error.message = `Could not find static page, ${id} is invalid`;
    throw error;
  }
  return updatedstaticpage;
};

export const deletedStaticPage = async (id) => {
  const update = { deleted_at: new Date() };
  await dbConnect();
  const deletedPage = await StaticPage.findByIdAndUpdate(id, update);
  if (!deletedPage) {
    // throw new Error(`Could not find ${id}`);
    const error = new Error();
    error.status = 404;
    error.message = `Could not find static page, ${id} is invalid`;
    throw error;
  }
  return;
};
