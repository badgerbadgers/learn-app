import mongoose from "mongoose";

const cohortSchema = new mongoose.Schema({
    cohort_name:{
      type: String,
      trim: true,
      required: [true, "Cohort name is required"],
      minlength: 1,
      maxlength: 16
      },
    created_at: {
      type: Date,
      default: Date.now
    },
    course: {
      type: mongoose.Types.ObjectId,
      minlength: 1,
      ref: 'Course',
      required: [true, "Course is required"], //TODO: if we have ID in db
    },
    start_date: {
      type: Date, 
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
      min: [0, "Seats value can't be negative"],
      max: 1000,
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

  // UserSchema.path('email').validate(async (value) => {
  //   const emailCount = await mongoose.models.User.countDocuments({email: value });
  //   return !emailCount;
  // }, 'Email already exists');


  
export default mongoose.models.Cohort || mongoose.model('Cohort', cohortSchema);