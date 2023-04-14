const { faker } = require("@faker-js/faker");
const userIds = require("../user_ids.json");
const { ObjectId } = require("mongodb");

const makeOne = (userId) => {
  const first = faker.name.firstName();
  const last = faker.name.lastName();
  const gh = faker.internet.userName(first, last);
  return {
    _id: ObjectId(userId),
    gh_id: faker.random.numeric(8),
    name: faker.name.fullName(first, last),
    email: faker.internet.email(first, last),
    image: "",
    gh: gh,
    url: "https://github.com/" + gh,
    emailVerified: null,
    is_admin: Math.random() < 0.2,
  };
};

module.exports = (() => {
  const users = [];
  for (const userId of userIds) {
    users.push(makeOne(userId));
  }
  return users;
})();
