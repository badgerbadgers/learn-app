import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  order: {
    type: Number,
  },
  course: {
    type: [mongoose.Types.ObjectId],
    ref: "Course",
  }
});

export default mongoose.models.Section || mongoose.model("Section", sectionSchema);