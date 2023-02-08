module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    try {
      await db.collection('users').updateMany({}, {$rename:{"isAdmin":"is_admin"}}, false, true)
    } catch (error) {
      console.error(error)
    }
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    try {
      await db.collection('users').updateMany({}, {$rename:{"is_admin":"isAdmin"}}, false, true)
    } catch (error) {
      console.error(error)
    }
  }
};
