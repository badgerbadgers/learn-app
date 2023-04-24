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

  test("returns all acceptance forms", async ({ request }) => {
    //populate the database with some acceptance forms
    //call GET and get all the acceptance forms
    const response = await request.get(`/api/v1/acceptanceforms`);
    expect(response.ok()).toBeTruthy();
  });

  test("returns all acceptance forms in CSV file", async ({ request }) => {
    //populate the database with some acceptance forms
    //call GET and get all the acceptance forms report in CSV file

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
        //expect the row counts to be: number of test users + 1 header row
        expect(rowCount).toBe(userIds.length + 1);
      });
  });
});
