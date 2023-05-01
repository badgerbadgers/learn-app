import mongoose from "mongoose";

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
  deleted_at: {
    type: Date,
    default: null,
  },
});

staticpageSchema.pre("find", function () {
  this.where({ deleted_at: null });
});

staticpageSchema.pre("findOne", function () {
  this.where({ deleted_at: null });
});

staticpageSchema.pre("findOneAndUpdate", function () {
  this.where({ deleted_at: null });
});

export default mongoose.models.Staticpage ||
  mongoose.model("Staticpage", staticpageSchema);
