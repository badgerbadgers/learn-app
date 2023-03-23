const { faker } = require("@faker-js/faker");
const userIds = require("../user_ids.json");
const { ObjectId } = require("mongodb");

const makeOne = (userId) => {
  return {
    _id: ObjectId(faker.database.mongodbObjectId()),
    user: ObjectId(userId),
    __v: 0,
    active_step: 0,
    address_USResident: "no",
    address_mailing_city: faker.address.cityName(),
    address_mailing_country: faker.address.country(),
    address_mailing_same: false,
    address_mailing_state: faker.address.state(),
    address_mailing_street1: faker.address.streetAddress(),
    address_mailing_street2: "",
    address_mailing_zipcode: faker.address.zipCode(),
    address_physical_city: faker.address.cityName(),
    address_physical_country: faker.address.country(),
    address_physical_state: faker.address.state(),
    address_physical_street1: faker.address.streetAddress(),
    address_physical_street2: "",
    address_physical_zipcode: faker.address.zipCode(),
    background_learning_style: [],
    background_prior_coding_education: "",
    background_prior_coding_languages: [],
    consent_leave_notice: true,
    consent_work_commitment: true,
    demographics_dob: faker.date.birthdate().toISOString(),
    demographics_education: "",
    demographics_employed: "",
    demographics_gender_identity: ["Other"],
    demographics_gender_identity_self: "test",
    demographics_in_school: "",
    demographics_low_income: "no",
    demographics_pronouns: "",
    demographics_race_ethnicity: "Other",
    demographics_race_ethnicity_self: "test",
    demographics_spoken_languages: "",
    emergency_contact1_name: faker.name.fullName(),
    emergency_contact1_phone: faker.phone.number(),
    emergency_contact1_relationship: "Parent/Mother/Father",
    emergency_contact2_name: faker.name.fullName(),
    emergency_contact2_phone: faker.phone.number(),
    emergency_contact2_relationship: "Friend",
    is_completed: true,
    personal_email: faker.internet.email(),
    personal_first_name: faker.name.firstName(),
    personal_github: faker.random.alphaNumeric(10),
    personal_last_name: faker.name.lastName(),
    personal_phone: faker.phone.number(),
    completed_at: faker.date.recent().toISOString(),
  };
};

module.exports = (() => {
  const forms = [];
  for (const userId of userIds) {
    forms.push(makeOne(userId));
  }
  return forms;
})();
