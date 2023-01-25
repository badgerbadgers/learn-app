import mongoose from "mongoose";

const { Schema } = mongoose;

const acceptanceFormSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  github: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  USResident: {
    type: String,
  },
  physical_zipcode: {
    type: String,
    required: true,
  },
  physical_address_1: {
    type: String,
  },
  physical_address_2: {
    type: String,
  },
  physical_city: {
    type: String,
  },
  physical_state: {
    type: String,
  },
  physical_country: {
    type: String,
  },
  mailing_same: {
    type: Boolean,
  },
  mailing_zipcode: {
    type: String,
  },
  mailing_address_1: {
    type: String,
  },
  mailing_address_2: {
    type: String,
  },
  mailing_city: {
    type: String,
  },
  mailing_state: {
    type: String,
  },
  mailing_country: {
    type: String,
  },
  dob: {
    type: Date,
    required: true,
  },
  pronouns: {
    type: String,
  },
  gender_identity: {
    type: [String],
    required: true,
  },
  gender_identity_self: {
    type: String,
  },
  race_ethnicity: {
    type: String,
    required: true,
  },
  race_ethnicity_self: {
    type: String,
  },
  education: {
    type: String,
  },
  spoken_languages: {
    type: String,
  },
  employed: {
    type: String,
  },
  in_school: {
    type: String,
  },
  low_income: {
    type: String,
    required: true,
  },
  emergency_contact_1_name: {
    type: String,
    required: true,
  },
  emergency_contact_1_relationship: {
    type: String,
    required: true,
  },
  emergency_contact_1_phone: {
    type: String,
    required: true,
  },
  emergency_contact_2_name: {
    type: String,
    required: true,
  },
  emergency_contact_2_relationship: {
    type: String,
    required: true,
  },
  emergency_contact_2_phone: {
    type: String,
    required: true,
  },
  learning_style: {
    type: [String],
  },
  prior_coding_education: {
    type: String,
  },
  prior_coding_languages: {
    type: [String],
  },
  work_commitment_consent: {
    type: Boolean,
    required: true,
  },
  leave_notice_consent: {
    type: Boolean,
    required: true,
  },
});

export default mongoose.models.Acceptanceform ||
  mongoose.model("Acceptanceform", acceptanceFormSchema);
