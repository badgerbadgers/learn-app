import mongoose from "mongoose";
import Lesson from "lib/models/Lesson";
import { createSlug, updateSlugIfNeeded } from "lib/updateSlug/updateSlug";

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
// this hook makes undeleting not possible
//courseSchema.pre("findOneAndUpdate", filterDeletedItems);


courseSchema.pre("save", async function () {
  this.updateSlug();
});

courseSchema.pre("save", async function () {
  this.updateSlug();
});

courseSchema.methods.updateSlug = function () {
  this.slug = createSlug(this.course_name);
};

courseSchema.pre("updateOne", async function () {
  updateSlugIfNeeded(this, "course_name");
});
courseSchema.pre("findOneAndUpdate", async function () {
  updateSlugIfNeeded(this, "course_name");
});

export default mongoose.models.Course || mongoose.model("Course", courseSchema);
