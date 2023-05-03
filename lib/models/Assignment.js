import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  assignment_title: {
    type: String,
  },
  link: {
    type: String,
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

assignmentSchema.pre("find", filterDeletedItems);
assignmentSchema.pre("findOne", filterDeletedItems);
//assignmentSchema.pre("findByIdAndUpdate", filterDeletedItems);

export default mongoose.models.Assignment ||
  mongoose.model("Assignment", assignmentSchema);
