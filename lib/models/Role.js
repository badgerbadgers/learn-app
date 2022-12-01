import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
    required: [true, "Role name is required"],
    minlength: 1,
    maxlength: 256,
  },
});

export default mongoose.models.Role || mongoose.model("Role", roleSchema);
