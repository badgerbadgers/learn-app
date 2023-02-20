module.exports = {
  async up(db, client) {
    try {
      await db.collection('users').updateMany({}, {$rename:{"isAdmin":"is_admin"}}, false, true)
    } catch (error) {
      console.error(error)
    }
  },

  async down(db, client) {
    try {
      await db.collection('users').updateMany({}, {$rename:{"is_admin":"isAdmin"}}, false, true)
    } catch (error) {
      console.error(error)
    }
  }
};
