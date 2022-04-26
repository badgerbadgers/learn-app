// do i need this or can i add to user object on client side - feels like an extra network call
import { getSession } from "next-auth/react";
import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      return getUser(req, res);
    case "POST":
      return createAndUpdateUser(req, res);
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

const getUser = async (req, res) => {
  // connect to database
  const client = await clientPromise;
  const database = client.db(process.env.MONGODB_DB);

  // find the document matching the query.id - github id
  try {
    let doc = await database
      .collection("usersprofile")
      .findOne({ gh: req.query.id });

    return res.status(200).json(doc);
  } catch (error) {
    console.log(error, "error from getUser in /api/users");
  }
};


const createAndUpdateUser = async (req, res) => {
  //connect to database
  const client = await clientPromise;
  const database = client.db(process.env.MONGODB_DB);

  //get user ObjectId and image from session
  const session = await getSession({ req });
  const userId = session.user.id;
  const image = session.user.image;

  //data object from submit form
  let data = req.body.body;

  data = JSON.parse(data);
  data["gh"] = session.user.gh;
  data["userId"] = ObjectId(userId);
  data["image"] = image;
  if (data["createdAt"]) {
    data["updatedAt"] = new Date();
  } else {
    data["createdAt"] = new Date();
  }

  try {
    await database
      .collection("usersprofile")
      .findOneAndUpdate({ gh: req.query.id }, { $set: data }, { upsert: true });
    res.status(200).json({ message: `create and update User ${req.query.id}` });
  } catch (error) {
    console.log(error, "error from createAndUpdateUser in api/users");
  }
};
