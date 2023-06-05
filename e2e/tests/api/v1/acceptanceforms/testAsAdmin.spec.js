import { test, expect } from "e2e/fixtures/testAsAdmin";
const { Readable } = require("stream");
import { parseStream } from "fast-csv";

test.describe("/api/v1/acceptanceforms", () => {
  //GET TESTS

  test("returns all acceptance forms", async ({ request, db }) => {
    //call GET and get all the acceptance forms
    const response = await request.get(`/api/v1/acceptanceforms`);
    expect(response.ok()).toBeTruthy();

    //check if the response body contains an array of data
    const body = await response.json();
    expect(Array.isArray(body.data)).toBeTruthy();

    //check if the length of the response body.data array is equal to the count of documents in the collection
    const collection = await db.collection("acceptanceforms");
    const count = await collection.countDocuments({ is_completed: true });
    expect(body.data.length).toEqual(count);
  });

  test("returns all acceptance forms in CSV file", async ({ request, db }) => {
    //check the database for a number of acceptance forms
    //call GET and get all the acceptance forms report in CSV file

    const count = await db
      .collection("acceptanceforms")
      .countDocuments({ is_completed: true });
    const response = await request.get(`/api/v1/acceptanceforms`, {
      headers: { Accept: "text/csv" },
    });
    const contentTypeHeader = response.headers()["content-type"];
    const isCsv = contentTypeHeader.includes("text/csv");
    expect(response.ok()).toBeTruthy();
    expect(isCsv).toBeTruthy();

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
        expect(rowCount).toBe(count + 1);
      });
  });
});
