import Role from "../../lib/models/Role";
import dbConnect from "../../lib/dbConnect";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case "GET":
      return getRoles(req, res);
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

const getRoles = async (req, res) => {
  let roles = [];
  try {
    roles = await Role.find({}).select({ name: 1, _id: 1 });
    res.status(200).json({ success: true, data: JSON.stringify(roles) });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false });
  }
  return res;
};
