/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     description: Returns user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: 62b22b42f4da59dbea98071b
 *     responses:
 *       200:
 *         description: Get the user by id
 *       400:
 *         description: Error messages
 *   patch:
 *     description: Update user by id
 *     tags: [Users]
 *   delete:
 *     description: Delete user by id
 *     tags: [Users]
 */
import User from "../../../../../lib/models/User";
import dbConnect from "../../../../../lib/dbConnect";

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;
  switch (method) {
    case "GET":
      try {
        const user = await getUser(id);
        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      return;
    case "PATCH":
      try {
        //call method for updating user by id filds: name, email, gh
        const user = await updateUser(id, req.body);
        res.status(200).json({ success: true, data: user });
      } catch (error) {
        //console.log(error);
        res.status(400).json({
          success: false,
          message: error.message,
        });
      }
      return;
    default:
      res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export const getUser = async (id) => {
  await dbConnect();
  const user = await User.findById(id).exec();
  return user;
};

export const updateUser = async (id, data) => {
  await dbConnect();
  const user = await User.findByIdAndUpdate(id, data);
  if (!user) {
    return res.status(400).json({ success: false });
  }
  //run mongoose validator to make sure data is ok (it will not check for github uniqueness)
  const validationErr = await user.validate();
  if(validationErr) {
    throw new Error(validationErr);
  }
  //make sure users github is unique
  const duplicateGHUser = await User.findOne({
    gh: user.gh,
  });
  if (duplicateGHUser) {
    throw new Error("Duplicate User Github");
  }
  return user;
}