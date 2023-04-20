import { test, expect } from "e2e/fixtures/testAsAdmin";
import { faker } from "@faker-js/faker";
const { Readable } = require("stream");
import { parseStream } from "fast-csv";
const userIds = require("e2e/setup/data/user_ids.json");

//new object to test
const newAcceptanceForm = {
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

test.describe("/api/v1/acceptanceforms", () => {
  //GET TESTS

  test("returns all acceptanceforms", async ({ request }) => {
    //populate the database with some acceptanceforms
    //call GET and get all the acceptanceforms
    const response = await request.get(`/api/v1/acceptanceforms`);
    expect(response.ok()).toBeTruthy();
  });

  test("returns all acceptanceforms in csv", async ({ request }) => {
    //populate the database with some acceptanceforms
    //call GET and get all the acceptanceforms report CSV file

    const response = await request.get(`/api/v1/acceptanceforms`, {
      headers: { Accept: "text/csv" },
    });
    expect(response.ok()).toBeTruthy();

    const acceptanceforms = await response.body();
    const stream = Readable.from(acceptanceforms);

    const dataInCsv = [];
    parseStream(stream)
      .on("error", (error) => console.error(error))
      .on("data", (row) => {
        dataInCsv.push(row);
      })
      .on("end", (rowCount) => {
        //expect the row counts to be:
        //number of test users + 1 header row
        expect(rowCount).toBe(userIds.length + 1);
      });
  });

  //POST TESTS

  test("returns an array with newly created object", async ({
    request,
    db,
  }) => {
    const user = await db
      .collection("users")
      .findOne({ email: "user@codethedream.org" });

    //new object to test
    const response = await request.post(`/api/v1/acceptanceforms`, {
      data: newAcceptanceForm,
    });
    expect(response.ok()).toBeTruthy();

    const responseData = (await response.json()).data;
    expect(responseData).toMatchObject(newAcceptanceForm);
    // check if the user id is the same
    expect(responseData.user).toEqual(user._id + "");
  });

  test("does not create an acceptanceform when personal_first_name property is missing", async ({
    request,
    db,
  }) => {
    const user = await db
      .collection("users")
      .findOne({ email: "user@codethedream.org" });

    //new object to test with deleted personal_first_name property
    const formWithoutFirstName = JSON.parse(JSON.stringify(newAcceptanceForm));
    delete formWithoutFirstName.personal_first_name;

    const response = await request.post(`/api/v1/acceptanceforms`, {
      data: formWithoutFirstName,
    });
    expect(response.ok()).toBeFalsy();

    // confirm our acceptanceform has not been created
    const getResponse = await request.get(`/api/v1/acceptanceforms`);
    expect(getResponse.ok()).toBeTruthy();

    const acceptanceForms = (await getResponse.json()).data;
    expect(acceptanceForms).not.toContainEqual(
      expect.objectContaining({
        completed_at: formWithoutFirstName.completed_at,
      })
    );
  });

  test("does not create an acceptanceform when personal_last_name property is missing", async ({
    request,
    db,
  }) => {
    const user = await db
      .collection("users")
      .findOne({ email: "user@codethedream.org" });

    //new object to test with deleted personal_last_name property
    const formWithoutLastName = JSON.parse(JSON.stringify(newAcceptanceForm));
    delete formWithoutLastName.personal_last_name;

    const response = await request.post(`/api/v1/acceptanceforms`, {
      data: formWithoutLastName,
    });
    expect(response.ok()).toBeFalsy();

    // confirm our acceptanceform has not been created
    const getResponse = await request.get(`/api/v1/acceptanceforms`);
    expect(getResponse.ok()).toBeTruthy();

    const acceptanceForms = (await getResponse.json()).data;
    expect(acceptanceForms).not.toContainEqual(
      expect.objectContaining({
        completed_at: formWithoutLastName.completed_at,
      })
    );
  });

  test("does not create an acceptanceform when personal_email property is missing", async ({
    request,
    db,
  }) => {
    const user = await db
      .collection("users")
      .findOne({ email: "user@codethedream.org" });

    //new object to test with deleted personal_email property
    const formWithoutEmail = JSON.parse(JSON.stringify(newAcceptanceForm));
    delete formWithoutEmail.personal_email;

    const response = await request.post(`/api/v1/acceptanceforms`, {
      data: formWithoutEmail,
    });
    expect(response.ok()).toBeFalsy();

    // confirm our acceptanceform has not been created
    const getResponse = await request.get(`/api/v1/acceptanceforms`);
    expect(getResponse.ok()).toBeTruthy();

    const acceptanceForms = (await getResponse.json()).data;
    expect(acceptanceForms).not.toContainEqual(
      expect.objectContaining({
        completed_at: formWithoutEmail.completed_at,
      })
    );
  });

  test("does not create an acceptanceform when personal_github property is missing", async ({
    request,
    db,
  }) => {
    const user = await db
      .collection("users")
      .findOne({ email: "user@codethedream.org" });

    //new object to test with deleted personal_github property
    const formWithoutGithub = JSON.parse(JSON.stringify(newAcceptanceForm));
    delete formWithoutGithub.personal_github;

    const response = await request.post(`/api/v1/acceptanceforms`, {
      data: formWithoutGithub,
    });
    expect(response.ok()).toBeFalsy();

    // confirm our acceptanceform has not been created
    const getResponse = await request.get(`/api/v1/acceptanceforms`);
    expect(getResponse.ok()).toBeTruthy();

    const acceptanceForms = (await getResponse.json()).data;
    expect(acceptanceForms).not.toContainEqual(
      expect.objectContaining({
        completed_at: formWithoutGithub.completed_at,
      })
    );
  });

  test("does not create an acceptanceform when personal_phone property is missing", async ({
    request,
    db,
  }) => {
    const user = await db
      .collection("users")
      .findOne({ email: "user@codethedream.org" });

    //new object to test with deleted personal_phone property
    const formWithoutPhone = JSON.parse(JSON.stringify(newAcceptanceForm));
    delete formWithoutPhone.personal_phone;

    const response = await request.post(`/api/v1/acceptanceforms`, {
      data: formWithoutPhone,
    });
    expect(response.ok()).toBeFalsy();

    // confirm our acceptanceform has not been created
    const getResponse = await request.get(`/api/v1/acceptanceforms`);
    expect(getResponse.ok()).toBeTruthy();

    const acceptanceForms = (await getResponse.json()).data;
    expect(acceptanceForms).not.toContainEqual(
      expect.objectContaining({
        completed_at: formWithoutPhone.completed_at,
      })
    );
  });

  test("does not create an acceptanceform when address_physical_zipcode property is missing", async ({
    request,
    db,
  }) => {
    const user = await db
      .collection("users")
      .findOne({ email: "user@codethedream.org" });

    //new object to test with deleted address_physical_zipcode property
    const formWithoutPhysicalZip = JSON.parse(
      JSON.stringify(newAcceptanceForm)
    );
    delete formWithoutPhysicalZip.address_physical_zipcode;

    const response = await request.post(`/api/v1/acceptanceforms`, {
      data: formWithoutPhysicalZip,
    });
    expect(response.ok()).toBeFalsy();

    // confirm our acceptanceform has not been created
    const getResponse = await request.get(`/api/v1/acceptanceforms`);
    expect(getResponse.ok()).toBeTruthy();

    const acceptanceForms = (await getResponse.json()).data;
    expect(acceptanceForms).not.toContainEqual(
      expect.objectContaining({
        completed_at: formWithoutPhysicalZip.completed_at,
      })
    );
  });

  test("does not create an acceptanceform when demographics_gender_identity property is missing", async ({
    request,
    db,
  }) => {
    const user = await db
      .collection("users")
      .findOne({ email: "user@codethedream.org" });

    //new object to test with deleted demographics_gender_identity property
    const formWithoutGenderIdentity = JSON.parse(
      JSON.stringify(newAcceptanceForm)
    );
    delete formWithoutGenderIdentity.demographics_gender_identity;

    const response = await request.post(`/api/v1/acceptanceforms`, {
      data: formWithoutGenderIdentity,
    });
    expect(response.ok()).toBeFalsy();

    // confirm our acceptanceform has not been created
    const getResponse = await request.get(`/api/v1/acceptanceforms`);
    expect(getResponse.ok()).toBeTruthy();

    const acceptanceForms = (await getResponse.json()).data;
    expect(acceptanceForms).not.toContainEqual(
      expect.objectContaining({
        completed_at: formWithoutGenderIdentity.completed_at,
      })
    );
  });

  test("does not create an acceptanceform when demographics_race_ethnicity property is missing", async ({
    request,
    db,
  }) => {
    const user = await db
      .collection("users")
      .findOne({ email: "user@codethedream.org" });

    //new object to test with deleted demographics_race_ethnicity property
    const formWithoutRaceEthnicity = JSON.parse(
      JSON.stringify(newAcceptanceForm)
    );
    delete formWithoutRaceEthnicity.demographics_race_ethnicity;

    const response = await request.post(`/api/v1/acceptanceforms`, {
      data: formWithoutRaceEthnicity,
    });
    expect(response.ok()).toBeFalsy();

    // confirm our acceptanceform has not been created
    const getResponse = await request.get(`/api/v1/acceptanceforms`);
    expect(getResponse.ok()).toBeTruthy();

    const acceptanceForms = (await getResponse.json()).data;
    expect(acceptanceForms).not.toContainEqual(
      expect.objectContaining({
        completed_at: formWithoutRaceEthnicity.completed_at,
      })
    );
  });

  test("does not create an acceptanceform when demographics_low_income property is missing", async ({
    request,
    db,
  }) => {
    const user = await db
      .collection("users")
      .findOne({ email: "user@codethedream.org" });

    //new object to test with deleted demographics_low_income property
    const formWithoutLowIncome = JSON.parse(JSON.stringify(newAcceptanceForm));
    delete formWithoutLowIncome.demographics_low_income;

    const response = await request.post(`/api/v1/acceptanceforms`, {
      data: formWithoutLowIncome,
    });
    expect(response.ok()).toBeFalsy();

    // confirm our acceptanceform has not been created
    const getResponse = await request.get(`/api/v1/acceptanceforms`);
    expect(getResponse.ok()).toBeTruthy();

    const acceptanceForms = (await getResponse.json()).data;
    expect(acceptanceForms).not.toContainEqual(
      expect.objectContaining({
        completed_at: formWithoutLowIncome.completed_at,
      })
    );
  });

  test("does not create an acceptanceform when emergency_contact1_name property is missing", async ({
    request,
    db,
  }) => {
    const user = await db
      .collection("users")
      .findOne({ email: "user@codethedream.org" });

    //new object to test with deleted emergency_contact1_name property
    const formWithoutConact1Name = JSON.parse(
      JSON.stringify(newAcceptanceForm)
    );
    delete formWithoutConact1Name.emergency_contact1_name;

    const response = await request.post(`/api/v1/acceptanceforms`, {
      data: formWithoutConact1Name,
    });
    expect(response.ok()).toBeFalsy();

    // confirm our acceptanceform has not been created
    const getResponse = await request.get(`/api/v1/acceptanceforms`);
    expect(getResponse.ok()).toBeTruthy();

    const acceptanceForms = (await getResponse.json()).data;
    expect(acceptanceForms).not.toContainEqual(
      expect.objectContaining({
        completed_at: formWithoutConact1Name.completed_at,
      })
    );
  });

  test("does not create an acceptanceform when emergency_contact1_relationship property is missing", async ({
    request,
    db,
  }) => {
    const user = await db
      .collection("users")
      .findOne({ email: "user@codethedream.org" });

    //new object to test with deleted emergency_contact1_relationship property
    const formWithoutConact1Relationship = JSON.parse(
      JSON.stringify(newAcceptanceForm)
    );
    delete formWithoutConact1Relationship.emergency_contact1_relationship;

    const response = await request.post(`/api/v1/acceptanceforms`, {
      data: formWithoutConact1Relationship,
    });
    expect(response.ok()).toBeFalsy();

    // confirm our acceptanceform has not been created
    const getResponse = await request.get(`/api/v1/acceptanceforms`);
    expect(getResponse.ok()).toBeTruthy();

    const acceptanceForms = (await getResponse.json()).data;
    expect(acceptanceForms).not.toContainEqual(
      expect.objectContaining({
        completed_at: formWithoutConact1Relationship.completed_at,
      })
    );
  });

  test("does not create an acceptanceform when emergency_contact1_phone property is missing", async ({
    request,
    db,
  }) => {
    const user = await db
      .collection("users")
      .findOne({ email: "user@codethedream.org" });

    //new object to test with deleted emergency_contact1_phone property
    const formWithoutConact1Phone = JSON.parse(
      JSON.stringify(newAcceptanceForm)
    );
    delete formWithoutConact1Phone.emergency_contact1_phone;

    const response = await request.post(`/api/v1/acceptanceforms`, {
      data: formWithoutConact1Phone,
    });
    expect(response.ok()).toBeFalsy();

    // confirm our acceptanceform has not been created
    const getResponse = await request.get(`/api/v1/acceptanceforms`);
    expect(getResponse.ok()).toBeTruthy();

    const acceptanceForms = (await getResponse.json()).data;
    expect(acceptanceForms).not.toContainEqual(
      expect.objectContaining({
        completed_at: formWithoutConact1Phone.completed_at,
      })
    );
  });

  test("does not create an acceptanceform when emergency_contact2_name property is missing", async ({
    request,
    db,
  }) => {
    const user = await db
      .collection("users")
      .findOne({ email: "user@codethedream.org" });

    //new object to test with deleted emergency_contact2_name property
    const formWithoutConact2Name = JSON.parse(
      JSON.stringify(newAcceptanceForm)
    );
    delete formWithoutConact2Name.emergency_contact2_name;

    const response = await request.post(`/api/v1/acceptanceforms`, {
      data: formWithoutConact2Name,
    });
    expect(response.ok()).toBeFalsy();

    // confirm our acceptanceform has not been created
    const getResponse = await request.get(`/api/v1/acceptanceforms`);
    expect(getResponse.ok()).toBeTruthy();

    const acceptanceForms = (await getResponse.json()).data;
    expect(acceptanceForms).not.toContainEqual(
      expect.objectContaining({
        completed_at: formWithoutConact2Name.completed_at,
      })
    );
  });

  test("does not create an acceptanceform when emergency_contact2_relationship property is missing", async ({
    request,
    db,
  }) => {
    const user = await db
      .collection("users")
      .findOne({ email: "user@codethedream.org" });

    //new object to test with deleted emergency_contact2_relationship property
    const formWithoutConact2Relationship = JSON.parse(
      JSON.stringify(newAcceptanceForm)
    );
    delete formWithoutConact2Relationship.emergency_contact2_relationship;

    const response = await request.post(`/api/v1/acceptanceforms`, {
      data: formWithoutConact2Relationship,
    });
    expect(response.ok()).toBeFalsy();

    // confirm our acceptanceform has not been created
    const getResponse = await request.get(`/api/v1/acceptanceforms`);
    expect(getResponse.ok()).toBeTruthy();

    const acceptanceForms = (await getResponse.json()).data;
    expect(acceptanceForms).not.toContainEqual(
      expect.objectContaining({
        completed_at: formWithoutConact2Relationship.completed_at,
      })
    );
  });

  test("does not create an acceptanceform when emergency_contact2_phone property is missing", async ({
    request,
    db,
  }) => {
    const user = await db
      .collection("users")
      .findOne({ email: "user@codethedream.org" });

    //new object to test with deleted emergency_contact2_phone property
    const formWithoutConact2Phone = JSON.parse(
      JSON.stringify(newAcceptanceForm)
    );
    delete formWithoutConact2Phone.emergency_contact2_phone;

    const response = await request.post(`/api/v1/acceptanceforms`, {
      data: formWithoutConact2Phone,
    });
    expect(response.ok()).toBeFalsy();

    // confirm our acceptanceform has not been created
    const getResponse = await request.get(`/api/v1/acceptanceforms`);
    expect(getResponse.ok()).toBeTruthy();

    const acceptanceForms = (await getResponse.json()).data;
    expect(acceptanceForms).not.toContainEqual(
      expect.objectContaining({
        completed_at: formWithoutConact2Phone.completed_at,
      })
    );
  });

  test("does not create an acceptanceform when consent_leave_notice property is missing", async ({
    request,
    db,
  }) => {
    const user = await db
      .collection("users")
      .findOne({ email: "user@codethedream.org" });

    //new object to test with deleted consent_leave_notice property
    const formWithoutLeaveNotice = JSON.parse(
      JSON.stringify(newAcceptanceForm)
    );
    delete formWithoutLeaveNotice.consent_leave_notice;

    const response = await request.post(`/api/v1/acceptanceforms`, {
      data: formWithoutLeaveNotice,
    });
    expect(response.ok()).toBeFalsy();

    // confirm our acceptanceform has not been created
    const getResponse = await request.get(`/api/v1/acceptanceforms`);
    expect(getResponse.ok()).toBeTruthy();

    const acceptanceForms = (await getResponse.json()).data;
    expect(acceptanceForms).not.toContainEqual(
      expect.objectContaining({
        completed_at: formWithoutLeaveNotice.completed_at,
      })
    );
  });

  test("does not create an acceptanceform when consent_work_commitment property is missing", async ({
    request,
    db,
  }) => {
    const user = await db
      .collection("users")
      .findOne({ email: "user@codethedream.org" });

    //new object to test with deleted consent_work_commitment property
    const formWithoutWorkCommitment = JSON.parse(
      JSON.stringify(newAcceptanceForm)
    );
    delete formWithoutWorkCommitment.consent_work_commitment;

    const response = await request.post(`/api/v1/acceptanceforms`, {
      data: formWithoutWorkCommitment,
    });
    expect(response.ok()).toBeFalsy();

    // confirm our acceptanceform has not been created
    const getResponse = await request.get(`/api/v1/acceptanceforms`);
    expect(getResponse.ok()).toBeTruthy();

    const acceptanceForms = (await getResponse.json()).data;
    expect(acceptanceForms).not.toContainEqual(
      expect.objectContaining({
        completed_at: formWithoutWorkCommitment.completed_at,
      })
    );
  });
});
