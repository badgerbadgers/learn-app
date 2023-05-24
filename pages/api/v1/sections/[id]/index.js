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
 *         description: Error messages
 *       404:
 *         description: Error message if section id to patch is not found
 *   delete:
 *     description: Soft delete a Section in database using the id
 *     tags: [Sections]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *           example: 63fd39c51e0a85c4749274ff
 *         description: id of the Section to soft delete
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
 *             deleted_at:
 *               type: string
 *               format: date #
 *               example: 2023-04-09T00:56:05.829+00:00
 *         description: the deleted Section object when a DELETE request is executed
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
 *                       type: date
 *                       example: 2023-05-05T01:31:37.035+00:00
 *       400:
 *         description: Error messages
 *       404:
 *         description: Error messages if Section id to soft delete not found
 *
 */

import Section from "lib/models/Section";
import dbConnect from "lib/dbConnect";

export default async function handler(req, res) {
  const { method } = req;
  const id = req.query.id;
  const updates = req.body;

  try {
    switch (method) {
      case "PATCH":
        const patchsection = await updateSection(id, updates);
        if (!patchsection) {
          const error = new Error();
          error.status = 404;
          error.message = `Could not find Section with id, id: ${id} is invalid`;
          throw error;
        }
        res.status(200).json({ data: patchsection });
        return;
      case "DELETE":
        const deletesection = await deleteSection(id);
        if (!deletesection) {
          const error = new Error();
          error.status = 404;
          error.message = `Could not delete Section with id, id: ${id} is invalid`;
          throw error;
        }
        res
          .status(200)
          .json({ message: `Section with id: ${id} has been deleted` });
        return;
      default:
        res.setHeader("Allow", ["PATCH", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.log(error);
    res.status(error.status || 400).json({ message: error.message });
  }
}

export const updateSection = async (id, updates) => {
  await dbConnect();
  const updatedsection = await Section.findByIdAndUpdate(id, updates, {
    runValidators: true,
    new: true,
  });

  if (!updatedsection) {
    return null;
  }
  return updatedsection;
};

export const deleteSection = async (id) => {
  const update = { deleted_at: new Date() };
  await dbConnect();
  const deletedsection = await Section.findByIdAndUpdate(id, update);
  if (!deletedsection) {
    return null;
  }
  return deletedsection;
};