/**
 * @swagger
 * /api/users/{id}:
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
    case "PATCH":
      try {
        //call method for updating user by id filds: name, email, gh
        const user = await updateUser(id, req.body);
        res.status(200).json({ success: true, data: user });
      } catch (error) {
        //console.log(error);
        res.status(400).json({
          success: false,
          message: error.message
        });
      }
      return;
    default:
      res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export const updateUser = async (id, data) => {
  await dbConnect();
  const user = await User.findByIdAndUpdate(id, data, {
    runValidators: true,
    new: true,
  });
  if (!user) {
    return res.status(400).json({ success: false });
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