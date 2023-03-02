module.exports = {
  async up(db, client) {
    await db
      .collection("cohorts")
      .updateMany({ schedule: { $exists: false } }, { $set: { schedule: [] } });
  },

  async down(db, client) {},
};
