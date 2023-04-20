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
 */

import dbConnect from "lib/dbConnect";
import { getSession } from "next-auth/react";
const { ObjectId } = require("mongodb");
import mongoose from "mongoose";

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        //Get acceptanceforms for user by Id
        const acceptanceforms = await getAcceptanceforms(req);
        if (!acceptanceforms) {
          return res
            .status(404)
            .json({
              message: "No acceptanceforms found",
            });
        }
        return res.status(200).json({ data: acceptanceforms });
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

export const getAcceptanceforms = async (req) => {
  await dbConnect();
  const session = await getSession({ req });
  const filter = {user: ObjectId(session.user.id)}
  if(!user) {
    const error = new Error();
    error.status = 404;
    error.message = "No acceptanceforms found";
    throw error
  }
  const collection = mongoose.connection.collection("acceptanceforms");
  const acceptanceforms = await collection.find(filter).toArray();
  return acceptanceforms;
};
