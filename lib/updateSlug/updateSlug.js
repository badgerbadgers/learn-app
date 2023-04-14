export const createSlug = function (name) {
    return name.trim().replaceAll(" ", "-").toLowerCase();
  };
  
  export async function updateSlugIfNeeded(model, field) {
    const update = model.getUpdate();
  
    if (field in update) {
      //update this query to also update end_date and status
      model.set({
        slug: createSlug(update[field]),
      });
    }
  }
  
  export default createSlug;
  