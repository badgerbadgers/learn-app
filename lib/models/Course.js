import mongoose from "mongoose";
import Lesson from "lib/models/Lesson";

const courseSchema = new mongoose.Schema({
  course_name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
  },
  lessons: {
    type: [mongoose.Types.ObjectId],
    ref: "Lesson",
  },
  deleted_at: {
    type: Date,
    default: null,
  },
});

const filterDeletedItems = function () {
  const filters = this.getFilter();
  if (!("deleted_at" in filters)) {
    this.where({ deleted_at: null });
  }
};

courseSchema.pre("find", filterDeletedItems);
courseSchema.pre("findOne", filterDeletedItems);
// courseSchema.pre("findOneAndUpdate", filterDeletedItems);


courseSchema.pre("save", async function () {
  this.updateSlug();
});

const createSlug = function (name) {
  return name.trim().replaceAll(" ", "-").toLowerCase();
};

courseSchema.methods.updateSlug = function () {
  this.slug = createSlug(this.course_name);
};

const updateSlugIfNeeded = async function () {
  const update = this.getUpdate();

  if ("course_name" in update) {
    //update this query to also update end_date and status
    this.set({
      slug: createSlug(update.course_name),
    });
  }
};
courseSchema.pre("updateOne", updateSlugIfNeeded);
courseSchema.pre("findOneAndUpdate", updateSlugIfNeeded);

export default mongoose.models.Course || mongoose.model("Course", courseSchema);
