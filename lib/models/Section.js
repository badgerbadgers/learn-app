import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
  tile: {
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

const filterDeletedItems = function () {
  const filters = this.getFilter();
  if (!("deleted_at" in filters)) {
    this.where({ deleted_at: null });
  }
};

sectionSchema.pre("find", filterDeletedItems);
sectionSchema.pre("findOne", filterDeletedItems);
//sectionSchema.pre("findByIdAndUpdate", filterDeletedItems);

export default mongoose.models.Section ||
  mongoose.model("Section", sectionSchema);
