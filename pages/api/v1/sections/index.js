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
 *
 */

import Section from "lib/models/Section";
import dbConnect from "lib/dbConnect";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const sections = await getSections();
        res.status(200).json({ data: sections });
        return; 
      } catch (error) {
        res.status(400).json({ message: error.message });
        return;
      }
    default:
      res.setheader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export const getSections = async () => {
  try {
    await dbConnect();

    const allsections = await Section.find({});
    return allsections;
  } catch (error) {
    throw new Error("Error getting sections");
  }
};