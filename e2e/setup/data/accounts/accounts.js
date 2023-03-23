const { faker } = require("@faker-js/faker");
const userIds = require("../user_ids.json");
const { ObjectId } = require("mongodb");

const makeOne = (userId) => {
  return {
    _id: ObjectId(faker.database.mongodbObjectId()),
    provider: "github",
    type: "oauth",
    providerAccountId: faker.random.numeric(8),
    access_token: faker.random.alphaNumeric(40),
    token_type: "bearer",
    scope: "read:user,user:email",
    userId: ObjectId(userId),
  };
};

module.exports = (() => {
  const accounts = [];
  for (const userId of userIds) {
    accounts.push(makeOne(userId));
  }
  return accounts;
})();
