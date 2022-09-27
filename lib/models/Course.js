
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    course_name:{
      type: String,
      required: true,
      },
      slug: {
        type: String,
      },
      lessons: [mongoose.Types.ObjectId], 
  });

export default mongoose.models.Course || mongoose.model('Course', courseSchema);