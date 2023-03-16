//an alternative implementation of findOneAndUpdate
//which splits into a find operation and a save operation
//allowing validators and middleware to run on the data (unlike Mongoose's implementation)
//modified version of https://floqast.com/engineering-blog/post/problem-solving-mongoose-validators-dont-run-on-update-queries/

export default async function altFindOneAndUpdate(
  query,
  update,
  options = { upsert: false }
) {
  const upsert = options.upsert || false;

  // Insert case
  const document = await this.findOne(query);
  if (!document) {
    return upsert
      ? this.create({
          ...query,
          ...update,
        })
      : null;
  }
  // Update case
  const updatedDocument = Object.assign(document, update);
  return updatedDocument.save();
}
