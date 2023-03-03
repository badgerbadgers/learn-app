module.exports = {
  async up(db, client) {
    const response = await db
      .collection("cohorts")
      .updateMany({}, { $pull: { schedule: { $in: [{}] } } });
    console.log(`${response.modifiedCount} documents updated`);
  },

  async down(db, client) {
    console.log("down not implemented");
  },
};
