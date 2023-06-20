/**
 * @swagger
 * /api/v1/users/[id]/acceptanceforms:
 *   get:
 *     description: Returns all acceptanceforms by user id
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Get all acceptanceforms by user id
 *       404:
 *         description: User not found
 *       400:
 *         description: Error messages
 */

import AcceptanceForm from "lib/models/AcceptanceForm";
import User from "lib/models/User";
import dbConnect from "lib/dbConnect";

const { ObjectId } = require("mongodb");

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;
  try {
    switch (method) {
      case "GET":
        //Get acceptanceforms for user by Id
        const acceptanceforms = await getAcceptanceforms(id);
        if (!acceptanceforms) {
          const error = new Error();
          error.status = 404;
          error.message = "User not found";
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
  }
}

export const getAcceptanceforms = async (userId) => {
  await dbConnect();
  const user = await User.findById(userId);
  if (!user) {
    return null;
  }
  const acceptanceforms = await AcceptanceForm.find({ user: ObjectId(userId) });
  return acceptanceforms;
};
