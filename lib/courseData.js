import { MongoClient } from "mongodb";

async function getMongoLessons() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);
  try {
    var resultArray = [];
    await client.connect();
    const db = client.db("myFirstDatabase");
    const lessonColl = db.collection("lessons");

    const cursor = lessonColl
      .find({}, { projection: { _id: 0 } })
      .sort({ order: 1 });
    await cursor.forEach((lessonObj) =>
      console.log(resultArray.push(lessonObj))
    );
    // getting collections excluding id
  } catch {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
  return resultArray;
}
console.log(getMongoLessons);

export { getMongoLessons };
