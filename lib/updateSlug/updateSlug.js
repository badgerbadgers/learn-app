import slugify from "slugify";

export function createSlug(name) {
  // if we want to remove characters, use slugify.extend({'%': '%', '<': '<', '>': '>', '&': '&', "$": "$"}); + use option in slugify - {remove: /[*%+~.()'"!:@&<>$]/g} to remove the characters
  return slugify(name, {lower: true});
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
