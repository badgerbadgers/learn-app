// do i need this or can i add to user object on client side - feels like an extra network call 
import { getSession } from "next-auth/react"; 
import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";


/* 
1) make conditional of POST (updateUser v createUser)
2) add error handling if doc is null or id is undefined to functions
3) remove getSession calls and add the data on the client-side 
4) merge document for updateUser
*/

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      return getUser(req, res);
    case "POST":
      //if (req.query.isEdit) { updateUser(req, res) } else createUser(res, req)
      return updateUser(req, res);
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

// const createNewUser & updateUser

const createUser = async (req, res) => {
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
  data["gh"] = req.query.id;
  data["userId"] = ObjectId(userId);
  data["image"] = image;
  data["createdAt"] = new Date();

  try {
    await database
      .collection("usersprofile")
      .findOneAndUpdate({ gh: req.query.id }, { $set: data }, { upsert: true });
    res.status(200).json({ message: `updated User ${req.query.id}` });
  } catch (error) {
    console.log(error, "error from updateUser in api/users");
  }
};

const updateUser = async (req, res) => {
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
  data["gh"] = req.query.id;
  data["userId"] = ObjectId(userId);
  data["image"] = image;
  data["updatedAt"] = new Date();

  try {
    await database
      .collection("usersprofile")
      .findOneAndUpdate({ gh: req.query.id }, { $set: data }, { upsert: true });
    res.status(200).json({ message: `updated User ${req.query.id}` });
  } catch (error) {
    console.log(error, "error from updateUser in api/users");
  }
};
