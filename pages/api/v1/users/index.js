/**
 * @swagger
 * tags:
 *   name: Users
 * /api/v1/users:
 *   get:
 *     description: Returns a list of all users
 *     tags: [Users]
 *     parameters:
 *        - in: query
 *          name: cohort
 *          type: string
 *          required: false
 *        - in: query
 *          name: course
 *          type: string
 *          required: false
 *        - in: query
 *          name: role
 *          type: string
 *          required: false
 *          description: students, mentors
 *        - in: query
 *          name: deleted
 *          type: boolean
 *          required: false
 *     responses:
 *       200:
 *         description: Provides an array of users
 *       400:
 *         description: Error messages
 *   post:
 *     description: Creates a new user
 *     tags: [Users]
 *     parameters:
 *        - name: name
 *          type: string
 *          required: true
 *        - name: email
 *          type: string
 *          required: true
 *        - name: gh
 *          type: string
 *          required: true
 *     responses:
 *       200:
 *         description: the created user
 *       400:
 *         description: Error messages
 */

import User from "lib/models/User";
import dbConnect from "lib/dbConnect";
import filterUsers from "lib/filterUsers";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        //call method for getting users with any parameters we received
        const users = await getUsers(req.query);
        res.status(200).json({ data: users });
      } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
      }
      return;
    case "POST":
      try {
        //call method for creating a user with any data we received
        const user = await createUser(req.body);
        res.status(200).json({ data: user });
      } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
      }
      return;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export const getUsers = async (filters = {}) => {
  await dbConnect();
  const users = await filterUsers(filters);
  return users
};

export const createUser = async (data) => {
  //run mongoose validator to make sure data is ok
  const newUser = new User(data);
  const validationErr = await newUser.validate();
  if(validationErr) {
    throw new Error(validationErr);
  }

  await dbConnect();

  //make sure github is unique
  const duplicateGH = await User.findOne({
    gh: newUser.gh,
  });
  if (duplicateGH) {
    throw new Error("Duplicate User Github");
  }

  //save the new user
  newUser.save();

  return newUser;
}
