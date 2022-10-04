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
    //see if this is right
  },
  learning_objectives: {
    type: [String],
    //in the schema this is supposed to be an array but its a string
  },
  mindset_content: {
    type: String,
  },
  materials: {
    type: [mongoose.Types.ObjectId],
    ref: "Material",
    //this is a reference but it's also an object id??
  },
  assignments: {
    type: [mongoose.Types.ObjectId],
    ref: "Assignment",
    //this is a reference but it's also an object id??
  },
  // for now leave out section
});

export default mongoose.models.Lesson || mongoose.model("Lesson", lessonSchema);
