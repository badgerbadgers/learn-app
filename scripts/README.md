# LearnApp Scripts

## Data Migration From Airtable

The folders `airtableMigration`, `mongoManipulation`, and `migrationCleanup` include scripts that take data regarding cohorts, classes etc. from Airtable and migrates it into Mongo in the proper structure.

The file `utils.js` includes helper functions for Mongo and Airtable.

## Configuration

The scripts require an **Airtable API key** and a **Mongo connection URI** and **Mongo database name**. They expect to find these parameters in a `.env` file.

## Order of operations

The scripts in the `airtableMigration` folder should be run first. These scripts transfer the data from the relevant Airtable bases into correlating collections in Mongo. They can be executed in any order.

Once all scripts in `airtableMigration` have been executed, the scripts in `mongoManipulation` can be run. These scripts build references between different collections, as well as handle changes to the data structure to match the [planned schema](https://www.figma.com/file/J3bzOgbpXCXbAQGwBFCvZv/DB-Schema?node-id=72846%3A1187). These scripts can also be executed in any order.

## Cleanup

The scripts in the `mongoManipulation` folder remove redundant fields left by by the Airtable migration and Mongo manipulation scripts.

These fields are not necessary for the app, but removing them before the migration is complete can make render some of the migration and manipulation scripts useless. In short, these scripts cannot be undone. **Do not run these scripts without being certain that you don't need these fields any more**, otherwise you might have to start the migration all over again.

## Database Structure

Please note that the db structure created with these scripts matches the [planned schema](https://www.figma.com/file/J3bzOgbpXCXbAQGwBFCvZv/DB-Schema?node-id=72846%3A1187). Any changes made to the schema since the creation of these scripts may not be reflected.

