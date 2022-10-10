import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  lesson_label: {
    type: String,
  },
  order: {
    type: Number,
  },
  submission_link: {
    type: { String, String },
  },
  learning_objectives: {
    type: [String],
  },
  mindset_content: {
    type: String,
  },
  materials: {
    type: [mongoose.Types.ObjectId],
    ref: "Material",
  },
  assignments: {
    type: [mongoose.Types.ObjectId],
    ref: "Assignment",
  },
  title: {
    type: String,
  },
  section: {
    type: [mongoose.Types.ObjectId],
    ref: "Section",
    // TODO:create section model
  },
});

export default mongoose.models.Lesson || mongoose.model("Lesson", lessonSchema);