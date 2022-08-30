import mongoose from "mongoose";
// const mongoose = require('mongoose');

// main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect(process.env.MONGODB_DB);
// }


const cohortSchema = new mongoose.Schema({
    cohort_name: String,
    // course_id: mongoose.Types.ObjectId(),
    created_at: Date,
    start_date: Date,
    seats: Number,
    students: Array,    
  });

// const Cohort = mongoose.model('cohorts', cohortSchema);

// module.exports = Cohort = mongoose.models['cohorts'] || mongoose.model('cohorts', cohortSchema);
// module.exports = mongoose.model('cohorts', cohortSchema);
export default mongoose.models.Cohort || mongoose.model('Cohort', cohortSchema);
// export default mongoose.models.cohort || mongoose.model('cohorts', cohortSchema)