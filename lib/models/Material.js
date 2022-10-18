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
});

export default mongoose.models.Material ||
  mongoose.model("Material", materialSchema);
