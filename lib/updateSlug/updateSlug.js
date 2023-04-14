export function createSlug(name) {
  return name.trim().replaceAll(" ", "-").toLowerCase();
}

export function updateSlugIfNeeded(model, field) {
  const update = model.getUpdate();

  if (field in update) {
    //update this query to also update end_date and status
    model.set({
      slug: createSlug(update[field]),
    });
  }
}
