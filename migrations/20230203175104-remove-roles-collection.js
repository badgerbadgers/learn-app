module.exports = {
  async up(db, client) {
    await db.collection('users').updateMany({}, {$unset: {roleIds: ""}});
    await db.collection('roles').drop();

  },

  async down(db, client) {
   
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
