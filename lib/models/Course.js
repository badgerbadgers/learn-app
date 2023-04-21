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

courseSchema.pre("findOne", function () {
  this.where({ deleted_at: null });
});

export default mongoose.models.Course || mongoose.model("Course", courseSchema);
