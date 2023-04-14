/**
 * @swagger
 * tags:
 *   name: Static pages
 * /api/v1/staticpages/{id}:
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
 *
 */


import StaticPage from "lib/models/StaticPage";
import dbConnect from "lib/dbConnect";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "PATCH":
      try {
        const id = req.query.id;
        const updatedData = req.body;
        const updatedStaticPage = {
          wordpress_id: updatedData.wordpress_id,
          isShown: updatedData.isShown,
          slug: updatedData.slug,
          title: updatedData.title,
          deleted_at: updatedData.deleted_at || null,
        };
        if (
          updatedStaticPage.isShown === undefined ||
          updatedStaticPage.wordpress_id === undefined
        ) {
          throw new Error(
            `Please ensure isShown and wordpress_id contain valid values.`
          );
        }
        await updateStaticPage(id, updatedStaticPage);
        return res.status(200).json({ data: req.body });
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
    case "DELETE":
      try {
        const id = req.query.id;
        await deletedStaticPage(id);
        return res.status(200).json({ message: "success" });
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
    default:
      res.setHeader("Allow", ["PATCH", "DELETE"]);
      res.status(405).rendered(`Method ${method} Not Allowed`);
  }
}

export const updateStaticPage = async (id, updatedStaticPage) => {
  try {
    await dbConnect();
    const updatedstaticpage = await StaticPage.findByIdAndUpdate(
      id,
      updatedStaticPage
    );
    if (!updatedstaticpage) {
      throw new Error(`${id} is not a valid id.`);
    }
    return updatedstaticpage;
  } catch (error) {
    console.log(error);
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