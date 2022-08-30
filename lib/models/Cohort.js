import mongoose from "mongoose";

const cohortSchema = new mongoose.Schema({
    cohort_name: String,
    course_id: mongoose.Types.ObjectId(),
    created_at: Date,
    start_date: Date,
    seats: Number,
    students: Array,    
  });

export default mongoose.models.Cohort || mongoose.model('Cohort', cohortSchema);