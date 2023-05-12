/**
 * @swagger
 * tags:
 *   name: Acceptance form
 * /api/v1/acceptanceforms:
 *   get:
 *     description: Returns a CSV file with all acceptance forms
 *     tags: [Acceptance form]
 *     responses:
 *       200:
 *        description: Acceptanceform.csv report file downloaded
 *       400:
 *        description: Error messages
 *       404:
 *        description: No acceptanceforms found
 *   post:
 *     description: Creates/updates an acceptance form
 *     tags: [Acceptance form]
 *     parameters:
 *       - in: body
 *         name: acceptance form
 *         required: true
 *         description: Creates/updates an acceptance form key value pairs
 *         schema:
 *           type: object
 *           required: [personal_first_name, personal_last_name, personal_email, personal_github, personal_phone, address_physical_zipcode, demographics_dob, demographics_gender_identity, demographics_race_ethnicity, demographics_low_income, emergency_contact1_name, emergency_contact1_relationship, emergency_contact1_phone, emergency_contact2_name, emergency_contact2_relationship, emergency_contact2_phone, consent_work_commitment, consent_leave_notice]
 *           properties:
 *             personal_first_name:
 *               type: string
 *             personal_last_name:
 *               type: string
 *             personal_email:
 *               type: string
 *             personal_github:
 *               type: string 
 *             personal_phone:
 *               type: string
 *             address_USResident:
 *               type: string
 *             address_physical_zipcode:
 *               type: string
 *             address_physical_street1:
 *               type: string
 *             address_physical_street2:
 *               type: string
 *             address_physical_city:
 *               type: string
 *             address_physical_state:
 *               type: string
 *             address_physical_country:
 *               type: string
 *             address_mailing_same:
 *               type: boolean
 *             address_mailing_zipcode:
 *               type: string
 *             address_mailing_street1:
 *               type: string
 *             address_mailing_street2:
 *               type: string
 *             address_mailing_city:
 *               type: string
 *             address_mailing_state:
 *               type: string
 *             address_mailing_country:
 *               type: string
 *             demographics_dob:
 *               type: string
 *               format: date-time
 *               example: 2019-05-17
 *             demographics_pronouns:
 *               type: string
 *             demographics_gender_identity:
 *               type: array
 *               items:
 *                 type: string
 *             demographics_gender_identity_self:
 *                 type: string
 *             demographics_race_ethnicity:
 *               type: string
 *             demographics_race_ethnicity_self:
 *               type: string
 *             demographics_education:
 *               type: string
 *             demographics_spoken_languages:
 *               type: string
 *             demographics_employed:
 *               type: string
 *             demographics_low_income:
 *               type: string
 *             emergency_contact1_name:
 *               type: string
 *             emergency_contact1_relationship:
 *               type: string
 *             emergency_contact1_phone:
 *               type: string
 *             emergency_contact2_name:
 *               type: string
 *             emergency_contact2_relationship:
 *               type: string
 *               required: true
 *             emergency_contact2_phone:
 *               type: string
 *             background_learning_style:
 *               type: array
 *               items:
 *                 type: string
 *             background_prior_coding_education:
 *               type: string
 *             background_prior_coding_languages:
 *               type: array
 *               items:
 *                 type: string
 *             consent_work_commitment:
 *               type: boolean
 *             consent_leave_notice:
 *               type: boolean
 *             active_step:
 *               type: number
 *             is_completed:
 *               type: boolean
 *             completed_at:
 *               type: string
 *               format: date-time
 *               example: 2019-05-17
 *     responses:
 *       200:
 *        description: Acceptance form created/updated
 *       400:
 *        description: Error messages
 */

import AcceptanceForm from "lib/models/AcceptanceForm.js";
import dbConnect from "lib/dbConnect.js";
import { getSession } from "next-auth/react";
import * as fastCsv from "fast-csv";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();
  const session = await getSession({ req });
  if (!session || !session.user) {
    res.status(401).json({ message: "Unauthorized user" });
    return;
  }
  switch (method) {
    case "GET":
      try {
        if (req.headers.accept === "text/csv") {
          const body = req.body;
          const result = await downloadReport(res, body, session);
          if (!result) {
            res.status(404).json({ message: "No acceptance forms found" });
            return;
          }
        } else {
          const result = await getAcceptanceForms;
          if (!result) {
            res.status(404).json({ message: "No acceptance forms found" });
            return;
          }
          res.status(200).json({ data: result });
        }
        return;
      } catch (error) {
        res.status(error.status || 400).json({ message: error.message });
        return;
      }
    case "POST":
      try {
        const acceptanceForm = await createAcceptanceForm(req.body, user.id);
        res.status(200).json({ success: true, data: acceptanceForm });
        return;
      } catch (error) {
        res.status(400).json({ message: error.message });
        return;
      }
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

const createAcceptanceForm = async (req, res) => {
  const body = req.body;
  const session = await getSession({ req });
  const filter = { user: session.user.id };
  const update = {
    user: session.user.id,
    personal_first_name: body.personal_first_name,
    personal_last_name: body.personal_last_name,
    personal_email: body.personal_email,
    personal_github: body.personal_github,
    personal_phone: body.personal_phone,
    address_USResident: body.address_USResident,
    address_physical_zipcode: body.address_physical_zipcode,
    address_physical_street1: body.address_physical_street1,
    address_physical_street2: body.address_physical_street2,
    address_physical_city: body.address_physical_city,
    address_physical_state: body.address_physical_state,
    address_physical_country: body.address_physical_country,
    address_mailing_same: body.address_mailing_same,
    address_mailing_zipcode: body.address_mailing_zipcode,
    address_mailing_street1: body.address_mailing_street1,
    address_mailing_street2: body.address_mailing_street2,
    address_mailing_city: body.address_mailing_city,
    address_mailing_state: body.address_mailing_state,
    address_mailing_country: body.address_mailing_country,
    demographics_dob: body.demographics_dob,
    demographics_pronouns: body.demographics_pronouns,
    demographics_gender_identity: body.demographics_gender_identity,
    demographics_gender_identity_self: body.demographics_gender_identity_self,
    demographics_race_ethnicity: body.demographics_race_ethnicity,
    demographics_race_ethnicity_self: body.demographics_race_ethnicity_self,
    demographics_education: body.demographics_education,
    demographics_spoken_languages: body.demographics_spoken_languages,
    demographics_employed: body.demographics_employed,
    demographics_in_school: body.demographics_in_school,
    demographics_low_income: body.demographics_low_income,
    emergency_contact1_name: body.emergency_contact1_name,
    emergency_contact1_relationship: body.emergency_contact1_relationship,
    emergency_contact1_phone: body.emergency_contact1_phone,
    emergency_contact2_name: body.emergency_contact2_name,
    emergency_contact2_relationship: body.emergency_contact2_relationship,
    emergency_contact2_phone: body.emergency_contact2_phone,
    background_learning_style: body.background_learning_style,
    background_prior_coding_education: body.background_prior_coding_education,
    background_prior_coding_languages: body.background_prior_coding_languages,
    consent_work_commitment: body.consent_work_commitment,
    consent_leave_notice: body.consent_leave_notice,
    active_step: body.active_step,
    is_completed: body.is_completed,
    completed_at: body.completed_at,
  };

  let document = await AcceptanceForm.findOne(filter);
  if (!document) {
    document = await AcceptanceForm.create({
      ...filter,
      ...update,
    });
  } else {
    // Update case
    document = Object.assign(document, update);
    await document.save();
  }
};

const downloadReport = async (res) => {
  const data = await AcceptanceForm.find();
  if (!data) {
    const error = new Error();
    error.status = 404;
    error.message = "No acceptanceforms found";
    throw error;
  }
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

const getAcceptanceForms = async () => {
  const acceptanceForms = await AcceptanceForm.find();
  if (!acceptanceForms) {
    const error = new Error();
    error.status = 404;
    error.message = "No acceptanceforms found";
    throw error;
  }
  return acceptanceForms;
};