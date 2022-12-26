import Staticpage from "../../lib/models/StaticPage";
import dbConnect from "../../lib/dbConnect";

var mongoose = require("mongoose");
export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();
  switch (method) {
    case "POST":
      await createStaticPages(req, res);
      return;
    default:
      res.setHeader("Allow", ["PATCH", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

const createStaticPages = async (req, res) => {
  const body = req.body;
  const filter = { wordpress_id: body.wp_id };
  const update = {
    wordpress_id: body.wp_id,
    isShown: body.isShown,
    title: body.title,
  };

  const newpages = [];
  try {
    const newpages = await Staticpage.findOneAndUpdate(filter, update, {
      upsert: true,
    });
    res.status(200).json({ success: true, data: JSON.stringify(newpages) });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false });
  }
};
