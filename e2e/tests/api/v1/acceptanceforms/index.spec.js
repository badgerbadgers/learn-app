import { test, expect } from "e2e/fixtures/testAsUser";
import { faker } from "@faker-js/faker";
const { Readable } = require("stream");
import { parseStream } from "fast-csv";
const userIds = require("e2e/setup/data/user_ids.json");

test.describe("/api/v1/acceptanceforms", () => {
  //GET TESTS

  test("returns all acceptanceforms", async ({ request }) => {
    //populate the database with some acceptanceforms

    //call GET and get all the acceptanceforms
    const response = await request.get(`/api/v1/acceptanceforms`);
    expect(response.ok()).toBeTruthy();

    // const acceptanceforms = (await response.json()).data;
  });

  //POST TEST

  // define your test data as an object
  // start a new browser instance
  // simulate a form submission with test data
  // wait for the API call to complete

  test.only("returns an array with newly created object", async ({
    request,
    db,
  }) => {
    const user = await db
      .collection("users")
      .findOne({ email: "user@codethedream.org" });

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

    const response = await request.post(`/api/v1/acceptanceforms`, {
      data: newAcceptanceForm,
    });
    expect(response.ok()).toBeTruthy();

    const responseData = (await response.json()).data;
    expect(responseData).toMatchObject(newAcceptanceForm);
    // check if the user id is the same
    expect(responseData.user).toEqual(user._id + "");
  });

  test("does not create an acceptanceform when first_name is missing", async ({
    request,
    db,
  }) => {
    const user = await db
      .collection("users")
      .findOne({ email: "user@codethedream.org" });

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
      personal_github: faker.random.alphaNumeric(10),
      personal_last_name: faker.name.lastName(),
      personal_phone: faker.phone.number(),
      completed_at: faker.date.recent().toISOString(),
    };

    const response = await request.post(`/api/v1/acceptanceforms`, {
      data: newAcceptanceForm,
    });
    expect(response.ok()).toBeFalsy();

    //confirm our acceptanceform has not been created
    const getResponse = await request.get(`/api/v1/acceptanceforms`);
    expect(getResponse.ok()).toBeTruthy();

    const acceptanceforms = await getResponse.body();
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

    // console.log("acceptanceforms", acceptanceforms);
    // expect(acceptanceforms).not.toContainEqual(
    //   expect.objectContaining({ completed_at: newAcceptanceForm.completed_at })
    // );
    // expect(acceptanceforms).toContainEqual(
    //   expect.objectContaining({ is_completed: true })
    // );
  });

  test("does not create an acceptanceform when last_name is missing", async ({
    request,
    db,
  }) => {
    const user = await db
      .collection("users")
      .findOne({ email: "user@codethedream.org" });

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
      personal_phone: faker.phone.number(),
      completed_at: faker.date.recent().toISOString(),
    };

    const response = await request.post(`/api/v1/acceptanceforms`, {
      data: newAcceptanceForm,
    });
    expect(response.ok()).toBeFalsy();

    //confirm our acceptanceform has not been created
    const getResponse = await request.get(`/api/v1/acceptanceforms`);
    expect(getResponse.ok()).toBeTruthy();

    const acceptanceforms = await getResponse.body();
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

  test("does not create an acceptanceform when email is missing", async ({
    request,
    db,
  }) => {
    const user = await db
      .collection("users")
      .findOne({ email: "user@codethedream.org" });

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
      personal_first_name: faker.name.firstName(),
      personal_github: faker.random.alphaNumeric(10),
      personal_last_name: faker.name.lastName(),
      personal_phone: faker.phone.number(),
      completed_at: faker.date.recent().toISOString(),
    };

    const response = await request.post(`/api/v1/acceptanceforms`, {
      data: newAcceptanceForm,
    });
    expect(response.ok()).toBeFalsy();

    //confirm our acceptanceform has not been created
    const getResponse = await request.get(`/api/v1/acceptanceforms`);
    expect(getResponse.ok()).toBeTruthy();

    const acceptanceforms = await getResponse.body();
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

  test("does not create an acceptanceform when github is missing", async ({
    request,
    db,
  }) => {
    const user = await db
      .collection("users")
      .findOne({ email: "user@codethedream.org" });

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
      personal_last_name: faker.name.lastName(),
      personal_phone: faker.phone.number(),
      completed_at: faker.date.recent().toISOString(),
    };

    const response = await request.post(`/api/v1/acceptanceforms`, {
      data: newAcceptanceForm,
    });
    expect(response.ok()).toBeFalsy();

    //confirm our acceptanceform has not been created
    const getResponse = await request.get(`/api/v1/acceptanceforms`);
    expect(getResponse.ok()).toBeTruthy();

    const acceptanceforms = await getResponse.body();
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

  test("does not create an acceptanceform when phone is missing", async ({
    request,
    db,
  }) => {
    const user = await db
      .collection("users")
      .findOne({ email: "user@codethedream.org" });

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

    const response = await request.post(`/api/v1/acceptanceforms`, {
      data: newAcceptanceForm,
    });
    expect(response.ok()).toBeFalsy();

    //confirm our acceptanceform has not been created
    const getResponse = await request.get(`/api/v1/acceptanceforms`);
    expect(getResponse.ok()).toBeTruthy();

    const acceptanceforms = await getResponse.body();
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

  test("does not create an acceptanceform when physical_zipcode is missing", async ({
    request,
    db,
  }) => {
    const user = await db
      .collection("users")
      .findOne({ email: "user@codethedream.org" });

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
      completed_at: faker.date.recent().toISOString(),
    };

    const response = await request.post(`/api/v1/acceptanceforms`, {
      data: newAcceptanceForm,
    });
    expect(response.ok()).toBeFalsy();

    //confirm our acceptanceform has not been created
    const getResponse = await request.get(`/api/v1/acceptanceforms`);
    expect(getResponse.ok()).toBeTruthy();

    const acceptanceforms = await getResponse.body();
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

  test("does not create an acceptanceform when dob is missing", async ({
    request,
    db,
  }) => {
    const user = await db
      .collection("users")
      .findOne({ email: "user@codethedream.org" });

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

    const response = await request.post(`/api/v1/acceptanceforms`, {
      data: newAcceptanceForm,
    });
    expect(response.ok()).toBeFalsy();

    //confirm our acceptanceform has not been created
    const getResponse = await request.get(`/api/v1/acceptanceforms`);
    expect(getResponse.ok()).toBeTruthy();

    const acceptanceforms = await getResponse.body();
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

  test("does not create an acceptanceform when gender_identity is missing", async ({
    request,
    db,
  }) => {
    const user = await db
      .collection("users")
      .findOne({ email: "user@codethedream.org" });

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

    const response = await request.post(`/api/v1/acceptanceforms`, {
      data: newAcceptanceForm,
    });
    expect(response.ok()).toBeFalsy();

    //confirm our acceptanceform has not been created
    const getResponse = await request.get(`/api/v1/acceptanceforms`);
    expect(getResponse.ok()).toBeTruthy();

    const acceptanceforms = await getResponse.body();
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

  test("does not create an acceptanceform when race_ethnicity is missing", async ({
    request,
    db,
  }) => {
    const user = await db
      .collection("users")
      .findOne({ email: "user@codethedream.org" });

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

    const response = await request.post(`/api/v1/acceptanceforms`, {
      data: newAcceptanceForm,
    });
    expect(response.ok()).toBeFalsy();

    //confirm our acceptanceform has not been created
    const getResponse = await request.get(`/api/v1/acceptanceforms`);
    expect(getResponse.ok()).toBeTruthy();

    const acceptanceforms = await getResponse.body();
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

  test("does not create an acceptanceform when low_income is missing", async ({
    request,
    db,
  }) => {
    const user = await db
      .collection("users")
      .findOne({ email: "user@codethedream.org" });

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

    const response = await request.post(`/api/v1/acceptanceforms`, {
      data: newAcceptanceForm,
    });
    expect(response.ok()).toBeFalsy();

    //confirm our acceptanceform has not been created
    const getResponse = await request.get(`/api/v1/acceptanceforms`);
    expect(getResponse.ok()).toBeTruthy();

    const acceptanceforms = await getResponse.body();
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

  test("does not create an acceptanceform when contact1_name is missing", async ({
    request,
    db,
  }) => {
    const user = await db
      .collection("users")
      .findOne({ email: "user@codethedream.org" });

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

    const response = await request.post(`/api/v1/acceptanceforms`, {
      data: newAcceptanceForm,
    });
    expect(response.ok()).toBeFalsy();

    //confirm our acceptanceform has not been created
    const getResponse = await request.get(`/api/v1/acceptanceforms`);
    expect(getResponse.ok()).toBeTruthy();

    const acceptanceforms = await getResponse.body();
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

  test("does not create an acceptanceform when contact1_relationship is missing", async ({
    request,
    db,
  }) => {
    const user = await db
      .collection("users")
      .findOne({ email: "user@codethedream.org" });

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

    const response = await request.post(`/api/v1/acceptanceforms`, {
      data: newAcceptanceForm,
    });
    expect(response.ok()).toBeFalsy();

    //confirm our acceptanceform has not been created
    const getResponse = await request.get(`/api/v1/acceptanceforms`);
    expect(getResponse.ok()).toBeTruthy();

    const acceptanceforms = await getResponse.body();
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

  test("does not create an acceptanceform when contact1_phone is missing", async ({
    request,
    db,
  }) => {
    const user = await db
      .collection("users")
      .findOne({ email: "user@codethedream.org" });

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

    const response = await request.post(`/api/v1/acceptanceforms`, {
      data: newAcceptanceForm,
    });
    expect(response.ok()).toBeFalsy();

    //confirm our acceptanceform has not been created
    const getResponse = await request.get(`/api/v1/acceptanceforms`);
    expect(getResponse.ok()).toBeTruthy();

    const acceptanceforms = await getResponse.body();
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

  test("does not create an acceptanceform when contact2_name is missing", async ({
    request,
    db,
  }) => {
    const user = await db
      .collection("users")
      .findOne({ email: "user@codethedream.org" });

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

    const response = await request.post(`/api/v1/acceptanceforms`, {
      data: newAcceptanceForm,
    });
    expect(response.ok()).toBeFalsy();

    //confirm our acceptanceform has not been created
    const getResponse = await request.get(`/api/v1/acceptanceforms`);
    expect(getResponse.ok()).toBeTruthy();

    const acceptanceforms = await getResponse.body();
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

  test("does not create an acceptanceform when contact2_relationship is missing", async ({
    request,
    db,
  }) => {
    const user = await db
      .collection("users")
      .findOne({ email: "user@codethedream.org" });

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
      is_completed: true,
      personal_email: faker.internet.email(),
      personal_first_name: faker.name.firstName(),
      personal_github: faker.random.alphaNumeric(10),
      personal_last_name: faker.name.lastName(),
      personal_phone: faker.phone.number(),
      completed_at: faker.date.recent().toISOString(),
    };

    const response = await request.post(`/api/v1/acceptanceforms`, {
      data: newAcceptanceForm,
    });
    expect(response.ok()).toBeFalsy();

    //confirm our acceptanceform has not been created
    const getResponse = await request.get(`/api/v1/acceptanceforms`);
    expect(getResponse.ok()).toBeTruthy();

    const acceptanceforms = await getResponse.body();
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

  test("does not create an acceptanceform when contact2_phone is missing", async ({
    request,
    db,
  }) => {
    const user = await db
      .collection("users")
      .findOne({ email: "user@codethedream.org" });

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
      emergency_contact2_relationship: "Friend",
      is_completed: true,
      personal_email: faker.internet.email(),
      personal_first_name: faker.name.firstName(),
      personal_github: faker.random.alphaNumeric(10),
      personal_last_name: faker.name.lastName(),
      personal_phone: faker.phone.number(),
      completed_at: faker.date.recent().toISOString(),
    };

    const response = await request.post(`/api/v1/acceptanceforms`, {
      data: newAcceptanceForm,
    });
    expect(response.ok()).toBeFalsy();

    //confirm our acceptanceform has not been created
    const getResponse = await request.get(`/api/v1/acceptanceforms`);
    expect(getResponse.ok()).toBeTruthy();

    const acceptanceforms = await getResponse.body();
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

  test("does not create an acceptanceform when work_commitment is missing", async ({
    request,
    db,
  }) => {
    const user = await db
      .collection("users")
      .findOne({ email: "user@codethedream.org" });

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

    const response = await request.post(`/api/v1/acceptanceforms`, {
      data: newAcceptanceForm,
    });
    expect(response.ok()).toBeFalsy();

    //confirm our acceptanceform has not been created
    const getResponse = await request.get(`/api/v1/acceptanceforms`);
    expect(getResponse.ok()).toBeTruthy();

    const acceptanceforms = await getResponse.body();
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

  test("does not create an acceptanceform when leave_notice is missing", async ({
    request,
    db,
  }) => {
    const user = await db
      .collection("users")
      .findOne({ email: "user@codethedream.org" });

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

    const response = await request.post(`/api/v1/acceptanceforms`, {
      data: newAcceptanceForm,
    });
    expect(response.ok()).toBeFalsy();

    //confirm our acceptanceform has not been created
    const getResponse = await request.get(`/api/v1/acceptanceforms`);
    expect(getResponse.ok()).toBeTruthy();

    const acceptanceforms = await getResponse.body();
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
});

//const fieldsToExpect = ["field1", "field2"]
//...
//for each fieldsToExpect:
//  expect(data[field]).to.....
