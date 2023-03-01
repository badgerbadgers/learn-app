import mongoose from "mongoose";

const { Schema } = mongoose;

const acceptanceFormSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
  },
  personal_first_name: {
    type: String,
    required: true,
  },
  personal_last_name: {
    type: String,
    required: true,
  },
  personal_email: {
    type: String,
    required: true,
  },
  personal_github: {
    type: String,
    required: true,
  },
  personal_phone: {
    type: String,
    required: true,
  },
  address_USResident: {
    type: String,
  },
  address_physical_zipcode: {
    type: String,
    required: true,
  },
  address_physical_street1: {
    type: String,
  },
  address_physical_street2: {
    type: String,
  },
  address_physical_city: {
    type: String,
  },
  address_physical_state: {
    type: String,
  },
  address_physical_country: {
    type: Object,
  },
  address_mailing_same: {
    type: Boolean,
  },
  address_mailing_zipcode: {
    type: String,
  },
  address_mailing_street1: {
    type: String,
  },
  address_mailing_street2: {
    type: String,
  },
  address_mailing_city: {
    type: String,
  },
  address_mailing_state: {
    type: String,
  },
  address_mailing_country: {
    type: Object,
  },
  demographics_dob: {
    type: Date,
    required: true,
  },
  demographics_pronouns: {
    type: String,
  },
  demographics_gender_identity: {
    type: [String],
    required: true,
  },
  demographics_gender_identity_self: {
    type: String,
  },
  demographics_race_ethnicity: {
    type: String,
    required: true,
  },
  demographics_race_ethnicity_self: {
    type: String,
  },
  demographics_education: {
    type: String,
  },
  demographics_spoken_languages: {
    type: String,
  },
  demographics_employed: {
    type: String,
  },
  demographics_in_school: {
    type: String,
  },
  demographics_low_income: {
    type: String,
    required: true,
  },
  emergency_contact1_name: {
    type: String,
    required: true,
  },
  emergency_contact1_relationship: {
    type: String,
    required: true,
  },
  emergency_contact1_phone: {
    type: String,
    required: true,
  },
  emergency_contact2_name: {
    type: String,
    required: true,
  },
  emergency_contact2_relationship: {
    type: String,
    required: true,
  },
  emergency_contact2_phone: {
    type: String,
    required: true,
  },
  background_learning_style: {
    type: [String],
  },
  background_prior_coding_education: {
    type: String,
  },
  background_prior_coding_languages: {
    type: [String],
  },
  consent_work_commitment: {
    type: Boolean,
    required: true,
  },
  consent_leave_notice: {
    type: Boolean,
    required: true,
  },
  active_step: {
    type: Number,
  },
  is_completed: {
    type: Boolean,
    default: false,
  },
  completed_at: {
    type: Date,
  },
});

export default mongoose.models.Acceptanceform ||
  mongoose.model("Acceptanceform", acceptanceFormSchema);
