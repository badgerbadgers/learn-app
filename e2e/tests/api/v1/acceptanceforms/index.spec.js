import { test, expect } from "e2e/fixtures/testAsAdmin";
import { faker } from "@faker-js/faker";
import { ObjectId } from "mongodb";

test.describe("/api/v1/acceptanceforms", () => {
  //POST TEST

  // define your test data as an object
  // start a new browser instance
  // simulate a form submission with test data
  // wait for the API call to complete

  test.only("returns an array with newly created object", async ({
    request,
  }) => {
    //new object to test
    const newAcceptanceForm = {
      _id: ObjectId("63eba5f8606021759bbf5e54"),
      user: "62a11039db71825ea1c4388f",
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

    //check if all the required fields are not null:

    //check personal_first_name cannot be null
    expect(newAcceptanceForm.personal_first_name).not.toBeNull();
    //check personal_last_name cannot be null
    expect(newAcceptanceForm.personal_last_name).not.toBeNull();
    //check personal_email cannot be null
    expect(newAcceptanceForm.personal_email).not.toBeNull();
    //check personal_github cannot be null
    expect(newAcceptanceForm.personal_github).not.toBeNull();
    //check personal_phone cannot be null
    expect(newAcceptanceForm.personal_phone).not.toBeNull();
    //check address_physical_zipcode cannot be null
    expect(newAcceptanceForm.address_physical_zipcode).not.toBeNull();
    //check demographics_dob cannot be null
    expect(newAcceptanceForm.demographics_dob).not.toBeNull();
    //check demographics_gender_identity cannot be null
    expect(newAcceptanceForm.demographics_gender_identity).not.toBeNull();
    //check demographics_race_ethnicity cannot be null
    expect(newAcceptanceForm.demographics_race_ethnicity).not.toBeNull();
    //check demographics_low_income cannot be null
    expect(newAcceptanceForm.demographics_low_income).not.toBeNull();
    //check emergency_contact1_name cannot be null
    expect(newAcceptanceForm.emergency_contact1_name).not.toBeNull();
    //check emergency_contact1_relationship cannot be null
    expect(newAcceptanceForm.emergency_contact1_relationship).not.toBeNull();
    //check emergency_contact1_phone cannot be null
    expect(newAcceptanceForm.emergency_contact1_phone).not.toBeNull();
    //check emergency_contact2_name cannot be null
    expect(newAcceptanceForm.emergency_contact2_name).not.toBeNull();
    //check emergency_contact2_relationship cannot be null
    expect(newAcceptanceForm.emergency_contact2_relationship).not.toBeNull();
    //check emergency_contact2_phone cannot be null
    expect(newAcceptanceForm.emergency_contact2_phone).not.toBeNull();
    //check consent_leave_notice cannot be null
    expect(newAcceptanceForm.consent_leave_notice).not.toBeNull();
    //check consent_work_commitment cannot be null
    expect(newAcceptanceForm.consent_work_commitment).not.toBeNull();

    //then do POST
    const response = await request.post(`/api/v1/acceptanceforms`, {
      data: newAcceptanceForm,
    });
    expect(response.ok()).toBeTruthy();

    //newly created object contains the following properties
    expect(newAcceptanceForm).toEqual(
      expect.objectContaining({
        _id: newAcceptanceForm._id,
        user: newAcceptanceForm.user,
        __v: newAcceptanceForm.__v,
        active_step: newAcceptanceForm.active_step,
        address_USResident: newAcceptanceForm.address_USResident,
        address_mailing_city: newAcceptanceForm.address_mailing_city,
        address_mailing_country: newAcceptanceForm.address_mailing_country,
        address_mailing_same: newAcceptanceForm.address_mailing_same,
        address_mailing_state: newAcceptanceForm.address_mailing_state,
        address_mailing_street1: newAcceptanceForm.address_mailing_street1,
        address_mailing_street2: newAcceptanceForm.address_mailing_street2,
        address_mailing_zipcode: newAcceptanceForm.address_mailing_zipcode,
        address_physical_city: newAcceptanceForm.address_physical_city,
        address_physical_country: newAcceptanceForm.address_physical_country,
        address_physical_state: newAcceptanceForm.address_physical_state,
        address_physical_street1: newAcceptanceForm.address_physical_street1,
        address_physical_street2: newAcceptanceForm.address_physical_street2,
        address_physical_zipcode: newAcceptanceForm.address_physical_zipcode,
        background_learning_style: newAcceptanceForm.background_learning_style,
        background_prior_coding_education:
          newAcceptanceForm.background_prior_coding_education,
        background_prior_coding_languages:
          newAcceptanceForm.background_prior_coding_languages,
        consent_leave_notice: newAcceptanceForm.consent_leave_notice,
        consent_work_commitment: newAcceptanceForm.consent_work_commitment,
        demographics_dob: newAcceptanceForm.demographics_dob,
        demographics_education: newAcceptanceForm.demographics_education,
        demographics_employed: newAcceptanceForm.demographics_employed,
        demographics_gender_identity:
          newAcceptanceForm.demographics_gender_identity,
        demographics_gender_identity_self:
          newAcceptanceForm.demographics_gender_identity_self,
        demographics_in_school: newAcceptanceForm.demographics_in_school,
        demographics_low_income: newAcceptanceForm.demographics_low_income,
        demographics_pronouns: newAcceptanceForm.demographics_pronouns,
        demographics_race_ethnicity:
          newAcceptanceForm.demographics_race_ethnicity,
        demographics_race_ethnicity_self:
          newAcceptanceForm.demographics_race_ethnicity_self,
        demographics_spoken_languages:
          newAcceptanceForm.demographics_spoken_languages,
        emergency_contact1_name: newAcceptanceForm.emergency_contact1_name,
        emergency_contact1_phone: newAcceptanceForm.emergency_contact1_phone,
        emergency_contact1_relationship:
          newAcceptanceForm.emergency_contact1_relationship,
        emergency_contact2_name: newAcceptanceForm.emergency_contact2_name,
        emergency_contact2_phone: newAcceptanceForm.emergency_contact2_phone,
        emergency_contact2_relationship:
          newAcceptanceForm.emergency_contact2_relationship,
        is_completed: newAcceptanceForm.is_completed,
        personal_email: newAcceptanceForm.personal_email,
        personal_first_name: newAcceptanceForm.personal_first_name,
        personal_github: newAcceptanceForm.personal_github,
        personal_last_name: newAcceptanceForm.personal_last_name,
        personal_phone: newAcceptanceForm.personal_phone,
        completed_at: newAcceptanceForm.completed_at,
      })
    );
  });
});
