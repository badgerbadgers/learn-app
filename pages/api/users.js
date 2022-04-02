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
  //data object from submit form  -- need to add image, github html
  let data = req.body.body;

  data = JSON.parse(data);
  data["gh"] = req.query.id
  data["user_id"] //  = ObjectId(from the get user - so make another call or grab it from the session) 

  // data.date = new Date(data.date); -- should i add a data when I update it. 

  let doc = await db.collection('usersprofile').insertOne(data, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    // db.close();
  });

  // let doc = await db.collection('users').insert({gh: req.query.id}, {$set:data}, {upsert: true})

  res.json({ message: `update User ${req.query.id}` });
};