import { test, expect } from "e2e/fixtures/testAsUser";
import { faker } from "@faker-js/faker";

//new oblect to test
const newAcceptanceform = {
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

test.describe("/api/v1/users/acceptanceforms", () => {
  //GET TESTS
  test("get returns 404 if acceptanceforms not found", async ({
    request,
    user,
    db,
  }) => {
    // delete created before acceptance form
    await db.collection("acceptanceforms").deleteOne({ user: user });

    //call GET and get all the non-deleted users
    const response = await request.get(`/api/v1/users/acceptanceforms`);
    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(404);
  });

  test("returns acceptanceforms for user by session", async ({
    request, user, db
  }) => {
    //create acceptanceform for session user
    const postAcceptanceform = await request.post(`/api/v1/acceptanceforms`, {
      data: newAcceptanceform,
    });
    expect(postAcceptanceform.ok()).toBeTruthy();

    //check if post response match to newAcceptanceform
    const responsePostAcceptanceform = (await postAcceptanceform.json()).data;
    expect(responsePostAcceptanceform).toMatchObject(newAcceptanceform);

    //check if the user id is the same
    expect(responsePostAcceptanceform.user).toEqual(user._id + "");

    //call GET and get acceptance form 
    const response = await request.get(`/api/v1/users/acceptanceforms`);
    expect(response.ok()).toBeTruthy();

    //check if get response match to posted acceptanceform
    const acceptanceforms = (await response.json()).data;
    expect(acceptanceforms).toMatchObject(responsePostAcceptanceform);

    // delete created before acceptance form
    await db.collection("acceptanceforms").deleteOne({ user: user });
  });

  test("returns last acceptanceforms for user by session", async ({
    request,
    user,
    db,
  }) => {
    //create acceptanceform for session user
    const postAcceptanceformFirst = await request.post(
      `/api/v1/acceptanceforms`,
      {
        data: newAcceptanceform,
      }
    );
    expect(postAcceptanceformFirst.ok()).toBeTruthy();

    //check if post response match to newAcceptanceform
    const responsePostAcceptanceformFirst = (
      await postAcceptanceformFirst.json()
    ).data;
    expect(responsePostAcceptanceformFirst).toMatchObject(newAcceptanceform);

    //check if the user id is the same
    expect(responsePostAcceptanceformFirst.user).toEqual(user._id + "");

    //create second acceptanceform for session user
    const postAcceptanceformLast = await request.post(
      `/api/v1/acceptanceforms`,
      {
        data: newAcceptanceform,
      }
    );
    expect(postAcceptanceformFirst.ok()).toBeTruthy();

    const responsePostAcceptanceformLast = (await postAcceptanceformLast.json())
      .data;
    expect(responsePostAcceptanceformLast).toMatchObject(newAcceptanceform);

    //check if the user id is the same
    expect(responsePostAcceptanceformLast.user).toEqual(user._id + "");

    //call GET and get all acceptance form for sessin's user
    const response = await request.get(`/api/v1/users/acceptanceforms`);
    expect(response.ok()).toBeTruthy();

    //check if get response match to last acceptanceform
    const getAcceptanceforms = (await response.json()).data;
    expect(getAcceptanceforms).toMatchObject(responsePostAcceptanceformLast);
    // delete created before acceptance form
    await db.collection("acceptanceforms").deleteOne({ user: user });
  });


  

});
