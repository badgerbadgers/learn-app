import mongoose from "mongoose";

const mongooseHidden = require("mongoose-hidden")({
  hidden: { ___v: true },
  defaultHidden: { _id: false },
});

const userprofileSchema = new mongoose.Schema({
  gh: {
    type: String,
    trim: true,
    required: [true, "User github is required"],
    minlength: 1,
    maxlength: 256,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  email: {
    type: String,
    required: [true, "User email is required"],
    minlength: 1,
    maxlength: 256,
  },
  firstName: {
    type: String,
    trim: true,
    required: [true, "User first name is required"],
    minlength: 1,
    maxlength: 256,
  },
  image: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, "User last name is required"],
    minlength: 1,
    maxlength: 256,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  cohort: {
    type: mongoose.Types.ObjectId,
    ref: "Cohort",
  },
  deleted_at: {
    type: Date,
    default: null,
  },
}, { collection: 'userprofiles'});

userprofileSchema.plugin(mongooseHidden);
export default mongoose.models.Userprofile || mongoose.model("Userprofile", userprofileSchema);
