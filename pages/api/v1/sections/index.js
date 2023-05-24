/**
 * @swagger
 * tags:
 *   name: Sections
 * /api/v1/sections:
 *   get:
 *     description: Gets all sections from database
 *     tags: [Sections]
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
 *                         type: string
 *                         example: 75ge23c42f9b73c474826693
 *                       title:
 *                         type: string
 *                         example: Git Basics
 *                       order:
 *                         type: number
 *                         example: 2
 *                       course:
 *                         type: number
 *                         example: 75ge23c42f9b73c474826693
 *                       deleted_at:
 *                         type: date
 *                         example: 2023-05-05T01:31:37.035+00:00
 *       400:
 *         description: Error messages
 *       404:
 *         description: Error message if no sections are found
 */

import Section from "lib/models/Section";
import dbConnect from "lib/dbConnect";

export default async function handler(req, res) {
  const { method } = req;

  try {
    switch (method) {
      case "GET":
        const sections = await getSections();
        if (!sections) {
          const error = new Error();
          error.status = 404;
          error.message = `Could not find any Sections`;
          throw error;
        }
        res.status(200).json({ data: sections });
        return;
      default:
        res.setheader("Allow", ["GET"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.log(error);
    res.status(error.status || 400).json({ message: error.message });
  }
}

export const getSections = async () => {
  await dbConnect();

  const allsections = await Section.find({});
  if (!allsections) {
    return null;
  }
  return allsections;
};