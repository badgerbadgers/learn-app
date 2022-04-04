import { getSession } from 'next-auth/react'
import { connectToDatabase } from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      return getUser(res, req);

    case "POST":
      return updateUser(req, res);
    // case "PUT":
    //   if (!req.body.data.isSelling) {
    //     return handleUpdate(req, res);
    //   }
    //   if (req.body.data.isSelling) {
    //     return handleSale(req, res);
    //   }
    // case "DELETE":
    //   return handleDelete(req, res);
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

const getUser = async (res, req) => {
  // connect to database
  const { db } = await connectToDatabase();
  // find the document matching the query.id - github id
  let doc = await db.collection('usersprofile').findOne({gh: req.query.id})

  return res.status(200).json(doc);
};


const updateUser = async (req, res) => {
  //connect to database 
  const { db } = await connectToDatabase();

  //get user ObjectId and image from session 
  const session = await getSession({ req })
  const userId = session.user.id;
  const image = session.user.image; 


  //data object from submit form
  let data = req.body.body;

  data = JSON.parse(data);
  data["gh"] = req.query.id
  data["userId"] = ObjectId(userId);
  data["image"] = image; 

  // TODO: DO I add a date
  // data.date = new Date(data.date); -- should i add a data when I update it. 
  
  /* The function below should do the following
    1) find the document and if exists update it, if not create a new one
    2) insertOne or findOneAndUpdate ()
    3) 
  
  */

  let doc = await db.collection('usersprofile').findOneAndUpdate({gh: req.query.id}, {$set:data}, {upsert: true});

  res.status(200).json({ message: `updated User ${req.query.id}` });
};