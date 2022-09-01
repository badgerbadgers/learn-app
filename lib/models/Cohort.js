import mongoose from "mongoose";

const cohortSchema = new mongoose.Schema({
    cohort_name:{
      type: String,
      required: true,
      },
    created_at: {
      type: Date,
      default: Date.now
    },
    course_id: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    start_date: {
      type: Date,
      required: true,  
    },
    zoom_link: {
      type: String,
      default: "",
    },
    students: [mongoose.Types.ObjectId], 
    mentors: [[mongoose.Types.ObjectId]],   
    seats: {
      type: Number,
      required: true, 
      // default: 0,
    },
    schedule: {
      type: [{}], 
    },
    archived: {
      type: Boolean
    },
    slug: {
      type: String,
    }
  });

export default mongoose.models.Cohort || mongoose.model('Cohort', cohortSchema);