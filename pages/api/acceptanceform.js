import AcceptanceForm from "../../lib/models/AcceptanceForm.js";
import dbConnect from "../../lib/dbConnect.js";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case "GET":
      console.log("get", res.body);
      // return await getAcceptanceForm(req, res);
      return;
    case "POST":
      console.log("post", req.body);
      await createAcceptanceForm(req, res);
      return;
    default:
      res.setHeader("Allow", ["GET", "POST"]);

      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

const createAcceptanceForm = async (req, res) => {
  const body = req.body.body;
  const filter = {};
  const update = {
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    github: body.github,
    phone: body.phone,
    USResident: body.USResident,
    physical_zipcode: body.physical_zipcode,
    physical_address_1: body.physical_address_1,
    physical_address_2: body.physical_address_2,
    physical_city: body.physical_city,
    physical_state: body.physical_state,
    physical_country: body.physical_country,
    mailing_same: body.mailing_same,
    mailing_zipcode: body.mailing_zipcode,
    mailing_address_1: body.mailing_address_1,
    mailing_address_2: body.mailing_address_2,
    mailing_city: body.mailing_city,
    mailing_state: body.mailing_state,
    mailing_country: body.mailing_country,
    dob: body.dob,
    pronouns: body.pronouns,
    gender_identity: body.gender_identity,
    gender_identity_self: body.gender_identity_self,
    race_ethnicity: body.race_ethnicity,
    race_ethnicity_self: body.race_ethnicity_self,
    education: body.education,
    spoken_languages: body.spoken_languages,
    employed: body.employed,
    in_school: body.in_school,
    low_income: body.low_income,
    emergency_contact_1_name: body.emergency_contact_1_name,
    emergency_contact_1_relationship: body.emergency_contact_1_relationship,
    emergency_contact_1_phone: body.emergency_contact_1_phone,
    emergency_contact_2_name: body.emergency_contact_2_name,
    emergency_contact_2_relationship: body.emergency_contact_2_relationship,
    emergency_contact_2_phone: body.emergency_contact_2_phone,
    learning_style: body.learning_style,
    prior_coding_education: body.prior_coding_education,
    prior_coding_languages: body.prior_coding_languages,
    work_commitment_consent: body.work_commitment_consent,
    leave_notice_consent: body.leave_notice_consent,
  };
  // let newuser = [];
  console.log("update", update);
  try {
    const newuser = await AcceptanceForm.findOneAndUpdate(filter, update, {
      upsert: true,
    });
    res.status(200).json({ success: true, data: JSON.stringify(newuser) });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false });
  }
};
