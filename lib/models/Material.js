import mongoose from "mongoose";

const materialSchema = new mongoose.Schema({
  materials_title: {
    type: String,
  },
  source: {
    type: String,
  },
  url: {
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

materialSchema.pre("find", filterDeletedItems);
materialSchema.pre("findOne", filterDeletedItems);
//materialSchema.pre("findByIdAndUpdate", filterDeletedItems);

export default mongoose.models.Material ||
  mongoose.model("Material", materialSchema);
