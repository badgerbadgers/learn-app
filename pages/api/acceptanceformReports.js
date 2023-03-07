import dbConnect from "../../lib/dbConnect.js";
import mongoose from "mongoose";
import * as fastCsv from "fast-csv";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();
  await downloadReport(req, res);
  return;
}

const downloadReport = async (req, res) => {
  const collection = mongoose.connection.collection("acceptanceforms");

  const data = await collection.find().toArray();

  const stream = fastCsv.format({ headers: true });

  try {
    res.setHeader(
      "Content-disposition",
      "attachment; filename=acceptanceform.csv"
    );
    res.setHeader("Content-Type", "text/csv");
    stream.pipe(res);

    data.forEach((doc) => {
      stream.write(doc);
    });

    stream.end();
    mongoose.connection.close();
  } catch (error) {
    res.status(400).json({ success: false });
    console.error(error);
  }
};
