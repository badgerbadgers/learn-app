/**
 * @swagger
 * tags:
 *   name: Sections
 * /api/v1/sections/{id}:
 *   patch:
 *     description: Updates a Section in database using the id
 *     tags: [Sections]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *           example: 63fd39c51e0a85c4749274ff
 *         description: id of the section to update
 *       - in: body
 *         name: data
 *         schema:
 *           type: object
 *           properties:
 *             order:
 *               type: number
 *             course:
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
 *                     title:
 *                       type: string
 *                       example: Git Basics
 *                     order:
 *                       type: number
 *                       example: 2
 *       400:
 *         description: Error status
 *       404:
 *         description: Resource not found
 *   delete:
 *     description: Soft delete a Section in database using the id
 *     tags: [Sections]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *           example: 63fd39c51e0a85c4749274ff
 *         description: id of the section to soft delete
 *       - in: body
 *         name: data
 *         schema:
 *           type: object
 *           properties:
 *             order:
 *               type: number
 *             course:
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
 *                     order:
 *                       type: number
 *                       example: 2
 *                     course:
 *                       type: string
 *                       example: 633d9916ec0d4b5e83a6b062
 *                     title:
 *                       type: string
 *                       example: Git Basics
 *       400:
 *         description: Error status
 *       404:
 *         description: Resource not found
 *
 */

import Section from "lib/models/Section";
import dbConnect from "lib/dbConnect";

export default async function handler(req, res) {
  const { method } = req;
  const id = req.query.id;

  switch (method) {
    case "PATCH":
      try {
        const updates = req.body;
        const patchSection = await updateSection(id, updates);
        res.status(200).json({ data: patchSection });
        return;
      } catch (error) {
        console.error(error);
        res.status(error.status || 400).json({ message: error.message });
        return;
      }
    case "DELETE":
      try {
        const id = req.query.id;
        await deleteSection(id);
        res.status(200).json({ message: `Section has been deleted` });
        return;
      } catch (error) {
        console.error(error);
        res.status(error.status || 400).json({ message: error.message });
        return;
      }
    default:
      res.setHeader("Allow", ["PATCH", "DELETE"]);
      res.status(405).rendered(`Method ${method} Not Allowed`);
  }
}

export const updateSection = async (id, updates) => {
  await dbConnect();
  const updatedsection = await Section.findOneAndUpdate(id, updates, {
    runValidators: true,
    new: true,
  });
  if (!updatedsection) {
    const error = new Error();
    error.status = 404;
    error.message = `Error finding section - ${id} is invalid`;
    throw error;
  }
  return updatedsection;
};

export const deleteSection = async (id) => {
  const update = { deleted_at: new Date() };
  await dbConnect();
  const deletedsection = await Section.findOneAndUpdate(id, update);
  if (!deletedsection) {
    const error = new Error();
    error.status = 404;
    error.message = `Error deleting section - ${id} is invalid`;
    throw error;
  }
  return deletedsection;
};