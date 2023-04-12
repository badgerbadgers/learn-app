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
  const updates = req.body;
  switch (method) {
    case "GET":
      try {
        const user = await getUser(id);
        res.status(200).json({ data: user });
      } catch (error) {
        res.status(400).json({
          message: error.message,
        });
      }
      return;
    case "PATCH":
      try {
        //call method for updating user by id filds: name, email, gh
        const user = await updateUser(id, updates);
        res.status(200).json({ data: user });
      } catch (error) {
        res.status(400).json({
          message: error.message,
        });
      }
      return;
    case "DELETE":
      try {
        const user = await deleteUser(id);
        res.status(201).json({ data: user });
      } catch (error) {
        res.status(400).json({
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
  //Verify if not found user with this id
  if (!user) {
    throw new Error("No user found with this ID");
  }
  return user;
};

export const updateUser = async (id, updates) => {
  await dbConnect();
  //Verify if Github username already exist
  const duplicateGHUser = await User.findOne({
    gh: updates.gh,
  });

  if (duplicateGHUser) {
    throw new Error("User with Github username already exists");
  }

  //update user
  const user = await User.findByIdAndUpdate(id, updates, {
    runValidators: true,
  });

  //Verify if not found user with this id
  if (!user) {
    throw new Error("No user found with this ID");
  }
  return user;
};

export const deleteUser = async (id) => {
  await dbConnect();
  const user = await User.findByIdAndUpdate(id, {
    deleted_at: new Date(),
  });

  //Verify if not found user with this id
  if (!user) {
    throw new Error("No user found with this ID");
  }
  return user;
};
