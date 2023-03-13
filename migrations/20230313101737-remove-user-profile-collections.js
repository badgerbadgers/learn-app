module.exports = {
  async up(db, client) {
    await db.collection("userprofiles").drop();
    await db.collection("usersprofile").drop();
  },

  async down(db, client) {
    await db.createCollection("userprofiles");
    await db.createCollection("usersprofile");
  },
};
