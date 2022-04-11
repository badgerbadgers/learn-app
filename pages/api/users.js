import { getSession } from "next-auth/react";
import  clientPromise  from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      return getUser(res, req);
    case "POST":
      return updateUser(req, res);
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

const getUser = async (res, req) => {

  // connect to database
  const client = await clientPromise;
  const database = client.db("myFirstDatabase")

  // find the document matching the query.id - github id
  try {
    let doc = await database.collection("usersprofile").findOne({ gh: req.query.id });
    return res.status(200).json(doc);
  } catch (error) {
    console.log(error, "error from getUser in /api/users");
  }
};

const updateUser = async (req, res) => {

  //connect to database
  const client = await clientPromise;
  const database = client.db("myFirstDatabase");

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
    await database.collection("usersprofile").findOneAndUpdate(
      { gh: req.query.id },
      { $set: data },
      { upsert: true },
      // thought the statement below would add last modified doesn't seem too
      { $currentDate: { lastModified: true } }
    );
    res.status(200).json({ message: `updated User ${req.query.id}` });
  } catch (error) {
    console.log(error, "error from updateUser in api/users");
  }
};
