/**
 * @swagger
 * /api/v1/users/acceptanceforms:
 *   get:
 *     description: Returns all acceptanceforms for user by id
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Get all acceptanceforms for user
 *       400:
 *         description: Error messages
 *       404:
 *         description: No acceptanceforms found
 *       401:
 *         description: User unauthorized
 */

import dbConnect from "lib/dbConnect";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import AcceptanceForm from "lib/models/AcceptanceForm";

const { ObjectId } = require("mongodb");

export default async function handler(req, res) {
  const { method } = req;
  
  await dbConnect();
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session || !session.user) {
    res.status(401).json({ message: "Unauthorized user" });
    return;
  }

  try {
    switch (method) {
      case "GET":
        //Get acceptanceforms for user by Id
        const acceptanceforms = await getAcceptanceforms(session.user.id);
        if (!acceptanceforms) {
          const error = new Error();
          error.status = 404;
          error.message = "User ";
          throw error;
        }
        res.status(200).json({ data: acceptanceforms });
        return;

      default:
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.log(error);
    res.status(error.status || 400).json({
      message: error.message,
    });
    return;
  }
}

export const getAcceptanceforms = async (userId) => {
  const filter = { user: ObjectId(userId) };
  const acceptanceforms = await AcceptanceForm.findOne(filter);
  return acceptanceforms;
};
