import mongoose from "mongoose";
import altFindOneAndUpdate from "./altFindAndUpdate";

const staticpageSchema = new mongoose.Schema({
  wordpress_id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
  },
  slug: {
    type: String,
  },
  isShown: {
    type: Boolean,
    default: null,
  },
});

staticpageSchema.statics.altFindOneAndUpdate = altFindOneAndUpdate;

export default mongoose.models.Staticpage ||
  mongoose.model("Staticpage", staticpageSchema);
