module.exports = {
  async up(db, client) {
    await db.collection("userprofiles").drop();
    await db.collection("usersprofile").drop();
  },

  async down(db, client) {
    console.log("No rollback needed for this migration");
  },
};
