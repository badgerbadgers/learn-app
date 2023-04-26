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
  switch (method) {
    case "GET":
      try {
        //Get acceptanceforms for user by Id
        const acceptanceforms = await getAcceptanceforms(req, res);
        if (!acceptanceforms) {
           res
            .status(404)
            .json({
              message: "No acceptanceforms found",
            });
            return;
        }
        res.status(200).json({ data: acceptanceforms });
        return;
      } catch (error) {
        res.status(error.status || 400).json({
          message: error.message,
        });
        return;
      }
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export const getAcceptanceforms = async (req, res) => {

  await dbConnect();
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session || !session.user) {
    const error = new Error();
    error.status = 401;
    error.message = "User unauthorized";
    throw error;
  }
  
  const filter = {user: ObjectId(session.user.id)}
  const acceptanceforms = await AcceptanceForm.findOne(filter);
  return acceptanceforms;

};
