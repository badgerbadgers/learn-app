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
 *                       wordpress_id:
 *                         type: number
 *                         example: 4232
 *                       isShown:
 *                         type: boolean
 *                         example: false
 *                       slug:
 *                         type: string
 *                         example: giraffe-intro
 *                       title:
 *                         type: string
 *                         example: Giraffe Intro
 *
 */

import Section from "lib/models/Section";
import dbConnect from "lib/dbConnect";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        await getSections();
        return res.status(200).json({ message: success });
      } catch (error) {
        return res.status(400).json({ message: error });
      }
      return;
    default:
      res.setheader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export const getSections = async () => {
  try {
    await dbConnect();

    const sections = await Section.find({});
    console.log("sections", sections);
    return sections;
  } catch (error) {
    throw new Error("Error getting sections");
  }
};