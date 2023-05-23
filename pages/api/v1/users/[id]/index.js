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
import User from "lib/models/User";
import dbConnect from "lib/dbConnect";

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;
  try {
    switch (method) {
      case "GET":
        const getUserByID = await getUser(id);
        if (!getUserByID) {
          const error = new Error();
          error.status = 404;
          error.message = "No user found with this ID ";
          throw error;
        }
        res.status(200).json({ data: getUserByID });
        return;

      case "PATCH":
        //call method for updating user by id filds: name, email, gh
        const updateUserByID = await updateUser(id, req.body);
        if (!updateUserByID) {
          const error = new Error();
          error.status = 404;
          error.message = "No user found with this ID ";
          throw error;
        }
        res.status(200).json({ data: updateUserByID });
        return;
      case "DELETE":
        const deleteUserByID = await deleteUser(id);
        if (!deleteUserByID) {
          const error = new Error();
          error.status = 404;
          error.message = "No user found with this ID ";
          throw error;
        }
        res.status(200).json({ data: deleteUserByID });
        return;
      default:
        res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.log(error);
    res.status(error.status || 400).json({
      message: error.message,
    });
    return;
  }
}

export const getUser = async (id) => {
  await dbConnect();
  const user = await User.findById(id);
  return user;
};

export const updateUser = async (id, updates) => {
  await dbConnect();
  //Verify if Github username already exist
  if("gh" in updates) {
    const duplicateGHUser = await User.findOne({
      _id: { $ne: id },
      gh: updates.gh,
    });

    if (duplicateGHUser) {
      throw new Error("User with Github username already exists");
    }
  }
  
  //update user
  const user = await User.findByIdAndUpdate(id, updates, {
    runValidators: true,
  });

  return user;
};

export const deleteUser = async (id) => {
  await dbConnect();
  const user = await User.findByIdAndUpdate(id, {
    deleted_at: new Date(),
  });
  return user;
};
