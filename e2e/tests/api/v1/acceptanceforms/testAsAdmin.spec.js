import { test, expect } from "e2e/fixtures/testAsAdmin";
import { faker } from "@faker-js/faker";
const { Readable } = require("stream");
import { parseStream } from "fast-csv";
const userIds = require("e2e/setup/data/user_ids.json");

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
