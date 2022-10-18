import mongoose from "mongoose";
const mongooseHidden = require('mongoose-hidden')({
  hidden: { ___v: true },
  defaultHidden: { _id: false }
})
const scheduleItemSchema = new mongoose.Schema({ 
  type: {
    type: String,
    trim: true,
  },
  lesson: {
    type: mongoose.Types.ObjectId,
    trim: true,
    ref: "Lesson"
  },
  content: {
    type: String,
    trim: true,
  },
  section: {
    type: mongoose.Types.ObjectId,
    ref: "Section"
  },
  _id: false 
});
const cohortSchema = new mongoose.Schema({
  cohort_name: {
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
    type: [scheduleItemSchema],
  },
  archived: {
    type: Boolean
  },
  slug: {
    type: String,
  },
  deleted_at: {
    type: Date,
    default: null 
  }
});
cohortSchema.pre('find', function() {  // binding this keyword, do not use arrow func 
  this.where({ deleted_at: null });
});
cohortSchema.pre('findOne', function() {
  this.where({ deleted_at: null });
});
cohortSchema.pre('findByIdAndUpdate', function() {
  this.where({ deleted_at: null });
});
cohortSchema.plugin(mongooseHidden)
export default mongoose.models.Cohort || mongoose.model('Cohort', cohortSchema);