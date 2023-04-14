const getNewSlug = (model) => {
    console.log(model);
  
    const createSlug = function (name) {
      return name.trim().replaceAll(" ", "-").toLowerCase();
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
    return { createSlug, updateSlugIfNeeded };
  };
  
  export default getNewSlug;
  