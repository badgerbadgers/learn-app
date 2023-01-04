import User from "../../../lib/models/User";
import dbConnect from "../../../lib/dbConnect";
import { sanitize } from "../users";

export default async function handler(req, res) {
  console.log("handler cold:")
  const { method } = req;
  const { id } = req.query;
  await dbConnect();
  switch (method) {
    case "GET":
      try {
        const user = await User.findById(id).exec();
        res.status(200).json({ user: user });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "PUT":
      try {
        let userToDb = await sanitize(JSON.parse(req.body.body));

        //To check if the name of a GitHub repository is unique
        const existingUserGithub = await User.findOne({
          gh: userToDb.gh,
          _id: id,
        });
        if (existingUserGithub.length) {
          const error = {
            error: "User github is not unique",
          };
          res.status(400).json({
            success: false,
            message: error,
          });
          return;
        }
        
        let user = await User.findByIdAndUpdate(id, userToDb, { runValidators: true, new: true });
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

    case "DELETE":
      try {
        const deletedUser = await User.findByIdAndUpdate(id, { deleted_at: new Date() });
        if (!deletedUser) {
          return res.status(400).json({ success: false });
        }
        res.status(201).json({ success: true, data: { deleted: deletedUser.deletedCount } });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
  return res;
}
