module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    await db.collection('users').updateMany({}, {$unset: {hasProfile: ""}});
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    await db.collection('users').updateMany({}, {$set: {hasProfile: true}});
  }
};


// module.exports = {
//   async up(db, client) {
//     // TODO write your migration here. Write my own comments
//     // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
//     // Example:
//     await db.collection('users').update({}, {$unset: {hasProfile: true}});
//   },

//   async down(db, client) {
//     // TODO write the statements to rollback your migration (if possible)
//     // Example:
//     await db.collection('users').update({name: "Dahlak Keleta"}, {$set: {hasProfile: true}});
//   }
// };
