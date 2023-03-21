import dbConnect from "../../lib/dbConnect.js";
import mongoose from "mongoose";
import * as fastCsv from "fast-csv";

export default async function handler(req, res) {
  await dbConnect();
  await downloadReport(req, res);
  return;
}

const downloadReport = async (req, res) => {
  const collection = mongoose.connection.collection("acceptanceforms");
  const data = await collection.find().toArray();
  const stream = fastCsv.format({
    headers: [
      "_id",
      "user",
      "completed_at",
      "personal_first_name",
      "personal_last_name",
      "personal_email",
      "personal_github",
      "personal_phone",
      "address_USResident",
      "address_physical_zipcode",
      "address_physical_street1",
      "address_physical_street2",
      "address_physical_city",
      "address_physical_state",
      "address_physical_country",
      "address_mailing_same",
      "address_mailing_zipcode",
      "address_mailing_street1",
      "address_mailing_street2",
      "address_mailing_city",
      "address_mailing_state",
      "address_mailing_country",
      "demographics_dob",
      "demographics_pronouns",
      "demographics_gender_identity",
      "demographics_gender_identity_self",
      "demographics_race_ethnicity",
      "demographics_race_ethnicity_self",
      "demographics_education",
      "demographics_spoken_languages",
      "demographics_employed",
      "demographics_in_school",
      "demographics_low_income",
      "emergency_contact1_name",
      "emergency_contact1_relationship",
      "emergency_contact1_phone",
      "emergency_contact2_name",
      "emergency_contact2_relationship",
      "emergency_contact2_phone",
      "background_prior_coding_education",
      "background_prior_coding_languages",
      "background_learning_style",
      "consent_leave_notice",
      "consent_work_commitment",
    ],
  });
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
  } catch (error) {
    res.status(400).json({ success: false });
    console.error(error);
  }
};
