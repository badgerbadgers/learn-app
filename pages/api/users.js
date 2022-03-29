import { user } from "./testObject";

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "GET":
      return getUser(res);

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

const getUser = (res) => {
  return res.status(200).json(user); // sending data response in json format
};

const updateUser = (req, res) => {
  console.log("UPDATEUSER req", req.body)
  return res.status(200).end(); // sending status response "200" 
};