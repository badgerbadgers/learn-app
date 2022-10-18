import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  assignment_title: {
    type: String,
  },
  link: {
    type: String,
  },
});

export default mongoose.models.Assignment ||
  mongoose.model("Assignment", assignmentSchema);
