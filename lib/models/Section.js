import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
  },
  course: {
    type: mongoose.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  deleted_at: {
    type: Date,
    default: null,
  },
  deleted_at: {
    type: Date,
    default: null,
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

sectionSchema.pre("find", filterDeletedItems);
sectionSchema.pre("findOne", filterDeletedItems);
//sectionSchema.pre("findOneAndUpdate", filterDeletedItems);

export default mongoose.models.Section ||
  mongoose.model("Section", sectionSchema);
