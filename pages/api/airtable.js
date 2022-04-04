var Airtable = require("airtable");
var base = new Airtable({ apiKey: process.env.AT_KEY }).base(
  "appbGPDD4eNnI25Si"
);
import axios from "axios";

export default function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "GET":
      console.log("REQ", req.query);
      if (req.query.isZones) {
        return getZoneData(res);
      }
      // handle other cases here
      break;
    case "POST":
      // return handlePost(req, res)
      break;
    case "PUT":
    // return handleUpdate(req, res)
    case "DELETE":
    // return handleDelete(req, res)
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

const getZoneData = async (res) => {
  try {
    const records = await base("Zones").select().all();
    res.status(200).json(records);
  } catch (e) {
    console.log("ERROR with ZONES FETCH", e.message);
    res.status(400).json(e.message);
  }
};

// const handlePost = () => {

// }

// const handleUpdate = () => {

// }

// const handleDelete = () => {

// }
