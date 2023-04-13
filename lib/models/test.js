const getNewSlug = (schema, model) => {

    console.log(model)


  const createSlug = function (name) {
    return name.trim().replaceAll(" ", "-").toLowerCase();
  };

  schema.methods.updateSlug = function () {
    model.slug = createSlug(model.course_name);
  };

  const updateSlugIfNeeded = async function () {
    const update = model.getUpdate();

    if ("course_name" in update) {
      //update this query to also update end_date and status
      model.set({
        slug: createSlug(update.course_name),
      });
    }
  };
  schema.pre("save", async function () {
    console.log('=======')
    console.log(model)
    model.updateSlug();
  });
  schema.pre("updateOne", updateSlugIfNeeded);
  schema.pre("findOneAndUpdate", updateSlugIfNeeded);
};

export default getNewSlug;
