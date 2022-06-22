import { getSession } from "next-auth/react";
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      return updateUser(req, res);
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

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