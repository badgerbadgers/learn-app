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
});

// staticpageSchema.pre("find", function () {
//   // binding this keyword, do not use arrow func
//   this.where({ deleted_at: null })
// })

// staticpageSchema.pre("findOne", function () {
//   this.where({ deleted_at: null })
// })

// staticpageSchema.pre("findByIdAndUpdate", function () {
//   this.where({ deleted_at: null })
// })

export default mongoose.models.Staticpage ||
  mongoose.model("Staticpage", staticpageSchema);
