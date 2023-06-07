/**
 * @swagger
 * /api/v1/users/acceptanceforms:
 *   get:
 *     description: Returns latest acceptanceform for user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Get latest acceptanceform for user
 *       400:
 *         description: Error messages
 */

import dbConnect from "lib/dbConnect";
import { authOptions } from "pages/api/auth/[...nextauth]";
import AcceptanceForm from "lib/models/AcceptanceForm";
import { getServerSession } from "next-auth/next";

const { ObjectId } = require("mongodb");

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();
  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user) {
    res.status(401).json({ message: "Unauthorized user" });
    return;
  }

  try {
    switch (method) {
      case "GET":
        //Get acceptanceforms for user by Id
        const acceptanceform = await getAcceptanceforms(session.user.id);
        res.status(200).json({ data: acceptanceform });
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
  }
}

export const getAcceptanceforms = async (userId) => {
  const filter = { user: ObjectId(userId) };
  const acceptanceforms = await AcceptanceForm.find(filter).sort({ $natural: -1 });
  const acceptanceform = acceptanceforms[0]
  return acceptanceform;
};
