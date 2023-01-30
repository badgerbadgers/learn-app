module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    await db.collection('users').updateMany({}, {$unset: {hasProfile: ""}});
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    await db.collection('users').updateMany({}, {$set: {hasProfile: true}});
  }
};



