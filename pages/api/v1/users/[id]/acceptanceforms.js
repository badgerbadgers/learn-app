/**
 * @swagger
 * /api/v1/users/[id]/acceptanceforms:
 *   get:
 *     description: Returns all acceptanceforms by user id
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Get all acceptanceforms by user id
 *       400:
 *         description: Error messages
 */

import AcceptanceForm from "lib/models/AcceptanceForm";
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

export const getAcceptanceforms = async (id) => {
  await dbConnect();
  const acceptanceforms = await AcceptanceForm.find({user: ObjectId(id)});
    if (!acceptanceforms) {
      return null;
    }
  return acceptanceforms;
};
