module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    await db.collection('users').updateMany({}, {$unset: {roleIds: ""}});
    await db.collection('roles').drop();

  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    await db.collection('roles').insertOne({
      id: "1",
      name: "Admin"
    });
    await db.collection('roles').insertOne({
      id: "2",
      name: "Student"
    });
    await db.collection('roles').insertOne({
      id: "3",
      name: "Mentor"
    });
    await db.collection('users').updateMany({}, {$set: {roleIds: ['2']}});
  }  
};
