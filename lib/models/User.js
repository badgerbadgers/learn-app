import mongoose from "mongoose";

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
  has_profile: {
    type: Boolean,
  },
  role_ids: {
    type: [mongoose.Types.ObjectId],
    ref: "Role",
  },
  slug: {
    type: String,
  },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
