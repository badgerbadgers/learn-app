import mongoose from "mongoose";

const submissionLinkSchema = new mongoose.Schema({
  label: String,
  url: String,
});

const lessonSchema = new mongoose.Schema({
  order: {
    type: Number,
  },
  submission_link: submissionLinkSchema,

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
    type: mongoose.Types.ObjectId,
    ref: "Section",
  },
});

export default mongoose.models.Lesson || mongoose.model("Lesson", lessonSchema);
