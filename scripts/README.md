# LearnApp Scripts

## Data Migration From Airtable

The folders `airtableMigration`, `mongoManipulation`, and `migrationCleanup` include scripts that take data regarding cohorts, classes etc. from Airtable and migrates it into Mongo in the proper structure.

The file `utils.js` includes helper functions for Mongo and Airtable.

## Configuration

The scripts require an **Airtable API key** and a **Mongo connection URI** and **Mongo database name**. They expect to find these parameters in a `.env` file.

### Order of operations

The scripts in the `airtableMigration` folder should be run first. These scripts transfer the data from the relevant Airtable bases into correlating collections in Mongo. They can be executed in any order.

Once all scripts in `airtableMigration` have been executed, the scripts in `mongoManipulation` can be run. These scripts build references between different collections, as well as handle changes to the data structure to match the [planned schema](https://www.figma.com/file/J3bzOgbpXCXbAQGwBFCvZv/DB-Schema?node-id=72846%3A1187). These scripts can also be executed in any order.

The script `removeAirtableIds.js` in the `mongoManipulation` folder removes all fields holding Airtable Ids from all collections. These fields are not needed for the app to work, but are needed for the migration to work. **Do not run this script before you are certain you don't need these fields any more**, otherwise you'll need to migrate all the data from Airtable again.

