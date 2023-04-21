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
courseSchema.pre("findOneAndUpdate", filterDeletedItems);

export default mongoose.models.Course || mongoose.model("Course", courseSchema);
