module.exports = {
  async up(db, client) {
    await db.collection('users').updateMany({}, {$unset: {hasProfile: ""}});
  },

  async down(db, client) {
    await db.collection('users').updateMany({}, {$set: {hasProfile: true}});
  }
};
