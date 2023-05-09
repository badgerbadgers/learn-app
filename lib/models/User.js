import mongoose from "mongoose";

const mongooseHidden = require("mongoose-hidden")({
  hidden: { ___v: true },
  defaultHidden: { _id: false },
});

// filter only deleted users method
const filterDeletedItems = function () {
  const filters = this.getFilter();
  if (!("deleted_at" in filters)) {
    this.where({ deleted_at: null });
  }
};

const userSchema = new mongoose.Schema({
  gh_id: {
    type: Number,
    trim: true,
    //required: [true, "User github id is required"],
    minlength: 1,
    maxlength: 256,
  },
  name: {
    type: String,
    required: [true, "User name is required"],
    minlength: 1,
    maxlength: 300,
  },
  email: {
    type: String,
    required: [true, "User email is required"],
    minlength: 1,
    maxlength: 256,
  },
  image: {
    type: String,
    default: "",
  },
  gh: {
    type: String,
    trim: true,
    required: [true, "User github is required"],
    minlength: 1,
    maxlength: 256,
  },
  slug: {
    type: String,
  },
  is_admin: {
    type: Boolean,
    default: false,
  },
  last_seen: {
    type: Date,
  },
  deleted_at: {
    type: Date,
    default: null,
  },
});
userSchema.pre("find", filterDeletedItems);
userSchema.pre("findOne", filterDeletedItems);
userSchema.pre("findByIdAndUpdate", filterDeletedItems);
userSchema.plugin(mongooseHidden);
export default mongoose.models.User || mongoose.model("User", userSchema);
