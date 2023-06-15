/**
 * @swagger
 * tags:
 *   name: Student Resources
 * /api/v1/student-resources:
 *   get:
 *     description: Gets all student resources with boolean isShown equal to true
 *     tags: [Student Resources]
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
 *       400:
 *         description: Error messages
 */

import StaticPage from "lib/models/StaticPage";
import dbConnect from "lib/dbConnect";

export default async function handler(req, res) {
  const { method } = req;

  try {
    switch (method) {
      case "GET":
        const studentresources = await getStudentResourcesByIsShown();
        if (!studentresources) {
          return [];
        }
        res.status(200).json({ data: studentresources });
        return;
      default:
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${method} Not Allow`);
    }
  } catch (error) {
    console.log(error);
    res.status(error.status || 400).json({ message: error.message });
  }
}

export const getStudentResourcesByIsShown = async () => {
  await dbConnect();
  const studentresourcesshown = await StaticPage.find({
    isShown: true,
  });

  if (!studentresourcesshown) {
    return null;
  }
  return studentresourcesshown;
};
