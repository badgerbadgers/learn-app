/**
 * @swagger
 * tags:
 *   name: Users
 * /api/users:
 *   get:
 *     description: Returns all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: users
 *       400:
 *         description: error
 *   post:
 *     description: Add a new user
 *     tags: [Users]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             name: string
 *             email: string
 *             gh: string
 *           example:
 *             name: Jon Snow
 *             email: jon@gmail.com
 *             gh: Jon
 *     responses:
 *       200:
 *         description: Create the user
 *         content: 
 *           application/json:
 *       400:
 *         description: error
 */

import { getSession } from "next-auth/react";
import clientPromise from "../../lib/mongodb";
import User from "../../lib/models/User";
import dbConnect from "../../lib/dbConnect";
import filterUsers from "../../lib/filterUsers";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();
  switch (method) {
    case "GET":
      return await getUsers(req, res);
    case "POST":
      try {
        let userToDb = await sanitize(req.body);
        const user = await User.create(userToDb);
        if (!user) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: user });
      } catch (error) {
        console.log(error);
        const errors = {};
        Object.entries(error.errors).forEach(([k, v]) => {
          errors[k] = v.message;
        });
        return res.status(400).json({
          success: false,
          message: errors,
        });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

const getUsers = async (req, res) => {
  try {
    let users = await getUserFilters(req.query);
    res.status(200).json({ success: true, data: JSON.stringify(users) });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false });
  }
  return res;
};

const getUserFilters = async (filters) => {
  const users = await filterUsers(filters);
  return users;
};

const updateUser = async (req, res) => {
  //connect to database
  const client = await clientPromise;
  const database = client.db(process.env.MONGODB_DB);

  //get user ObjectId and image from session
  const session = await getSession({ req });
  const userGh = session.user.gh;

  //data object from submit form
  let data = req.body;

  try {
    await database
      .collection("users")
      .findOneAndUpdate({ gh: userGh }, { $set: data }, { upsert: true });
    res.status(200).json({ message: `create and update User ${userGh}` });
  } catch (error) {
    console.log(error, "error from createAndUpdateUser in api/users");
  }
};

export const sanitize = async (obj) => {
  return {
    name: obj.name,
    email: obj.email,
    gh: obj.gh,
  };
};
