import AcceptanceForm from "../../lib/models/AcceptanceForm.js";
import dbConnect from "../../lib/dbConnect.js";
import { getSession } from "next-auth/react";
import mongoose from "mongoose";
import fastCsv from "fast-csv";

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

// export default async function handler(req, res) {
//   const { method } = req;
//   await dbConnect();

//   switch (method) {
//     case "POST":
//       await createAcceptanceForm(req, res);
//       return;
//     default:
//       res.setHeader("Allow", ["POST"]);
//       res.status(405).end(`Method ${method} Not Allowed`);
//   }
// }

// const createAcceptanceForm = async (req, res) => {
//   const body = req.body.body;
//   const session = await getSession({ req });
//   const filter = { user: session.user.id };
//   const update = {
//     user: session.user.id,
//     personal_first_name: body.personal_first_name,
//     personal_last_name: body.personal_last_name,
//     personal_email: body.personal_email,
//     personal_github: body.personal_github,
//     personal_phone: body.personal_phone,
//     address_USResident: body.address_USResident,
//     address_physical_zipcode: body.address_physical_zipcode,
//     address_physical_street1: body.address_physical_street1,
//     address_physical_street2: body.address_physical_street2,
//     address_physical_city: body.address_physical_city,
//     address_physical_state: body.address_physical_state,
//     address_physical_country: body.address_physical_country,
//     address_mailing_same: body.address_mailing_same,
//     address_mailing_zipcode: body.address_mailing_zipcode,
//     address_mailing_street1: body.address_mailing_street1,
//     address_mailing_street2: body.address_mailing_street2,
//     address_mailing_city: body.address_mailing_city,
//     address_mailing_state: body.address_mailing_state,
//     address_mailing_country: body.address_mailing_country,
//     demographics_dob: body.demographics_dob,
//     demographics_pronouns: body.demographics_pronouns,
//     demographics_gender_identity: body.demographics_gender_identity,
//     demographics_gender_identity_self: body.demographics_gender_identity_self,
//     demographics_race_ethnicity: body.demographics_race_ethnicity,
//     demographics_race_ethnicity_self: body.demographics_race_ethnicity_self,
//     demographics_education: body.demographics_education,
//     demographics_spoken_languages: body.demographics_spoken_languages,
//     demographics_employed: body.demographics_employed,
//     demographics_in_school: body.demographics_in_school,
//     demographics_low_income: body.demographics_low_income,
//     emergency_contact1_name: body.emergency_contact1_name,
//     emergency_contact1_relationship: body.emergency_contact1_relationship,
//     emergency_contact1_phone: body.emergency_contact1_phone,
//     emergency_contact2_name: body.emergency_contact2_name,
//     emergency_contact2_relationship: body.emergency_contact2_relationship,
//     emergency_contact2_phone: body.emergency_contact2_phone,
//     background_learning_style: body.background_learning_style,
//     background_prior_coding_education: body.background_prior_coding_education,
//     background_prior_coding_languages: body.background_prior_coding_languages,
//     consent_work_commitment: body.consent_work_commitment,
//     consent_leave_notice: body.consent_leave_notice,
//     active_step: body.active_step,
//     is_completed: body.is_completed,
//     completed_at: body.completed_at,
//   };
//   try {
//     const newuser = await AcceptanceForm.findOneAndUpdate(filter, update, {
//       upsert: true,
//     });
//     res.status(200).json({ success: true, data: JSON.stringify(newuser) });
//   } catch (error) {
//     res.status(400).json({ success: false });
//     console.error(error);
//   }
// };
