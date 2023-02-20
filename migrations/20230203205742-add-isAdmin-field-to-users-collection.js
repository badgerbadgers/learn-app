module.exports = {
  async up(db, client) {
  
    await db.collection('users').updateMany({}, {$set: {isAdmin: false}});
  },

  async down(db, client) {
    await db.collection('users').updateMany({}, {$unset: {isAdmin:""}});
  }
};
