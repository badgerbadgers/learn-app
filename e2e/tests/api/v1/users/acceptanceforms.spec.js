import { test, expect } from "e2e/fixtures/testAsUser";
import { faker } from "@faker-js/faker";
import { ObjectId } from "bson";

test.describe("/api/v1/users/acceptanceforms", () => {
  //GET TESTS

  test.fixme("returns all acceptanceforms for user by session", async ({
    request, db
  }) => {
    //create acceptanceform for session user
    const userId = db.collection('users').findOne({email: "user@codethedream.org"})
    const newAcceptanceform = {
      id: ObjectId(faker.database.mongodbObjectId()),
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

    const postAcceptanceform = await request.post(`/api/v1/acceptanceforms`, {
      data: newAcceptanceform,
    });
    expect(postAcceptanceform.ok()).toBeTruthy();

    const responseNewAcceptanceform = (await postAcceptanceform.json()).data;

    //call GET and get all acceptance form for sessin's user
    const response = await request.get(`/api/v1/users/acceptanceforms`);
    expect(response.ok()).toBeTruthy();

    const acceptanceforms = (await response.json()).data;

    //delete created before acceptance form
    await db
      .collection("acceptanceforms")
      .deleteOne({ _id: ObjectId(responseNewAcceptanceform._id) });
  });


  test("get returns 404 if acceptanceforms not found", async ({
    request,
  }) => {
    //call GET and get all the non-deleted users
    const response = await request.get(`/api/v1/users/acceptanceforms`); 
    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(404);
  });

});
