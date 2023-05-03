import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  order: {
    type: Number,
  },
  course: {
    type: mongoose.Types.ObjectId,
    ref: "Course",
  },
  deleted_at: {
    type: Date,
    default: null,
  },
});

sectionSchema.pre("find", function () {
  this.where({ deleted_at: null });
});

sectionSchema.pre("findOne", function () {
  this.where({ deleted_at: null });
});

sectionSchema.pre("findByOneAndUpdate", function () {
  this.where({ deleted_at: null });
});

export default mongoose.models.Section || mongoose.model("Section", sectionSchema);