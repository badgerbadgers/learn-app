import Assignment from "./Assignment"
import Course from "./Course"
import Lesson from "./Lesson"
import Material from "./Material"
import Section from "./Section"
import mongoose from "mongoose"
import { addWeeks } from "date-fns";

const mongooseHidden = require("mongoose-hidden")({
  hidden: { ___v: true },
  defaultHidden: { _id: false },
});

const scheduleItemSchema = new mongoose.Schema({
  type: {
    type: String,
    trim: true,
    required: [true, "Schedule item type is required"],
    minlength: 1,
    maxlength: 256,
  },
  lesson: {
    type: mongoose.Types.ObjectId,
    trim: true,
    ref: "Lesson",
  },
  content: {
    type: String,
    trim: true,
  },
  section: {
    type: mongoose.Types.ObjectId,
    ref: "Section",
  },
  _id: false,
});

const userSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    trim: true,
    ref: "Student",
  },
  added_at: {
    type: Date,
  },
  _id: false,
});

const cohortSchema = new mongoose.Schema({
  cohort_name: {
    type: String,
    trim: true,
    required: [true, "Cohort name is required"],
    minlength: 1,
    maxlength: 256,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  course: {
    type: mongoose.Types.ObjectId,
    minlength: 1,
    ref: "Course",
    required: [true, "Course is required"],
  },
  start_date: {
    type: Date,
  },
  end_date: {
    type: Date,
  },
  zoom_link: {
    type: String,
    default: "",
  },

  students: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
      added_at: {
        type: Date,
      },
    },
  ],

  mentors: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    },
  ],

  seats: {
    type: Number,
    required: true,
    min: [0, "Seats value can't be negative"],
    max: 1000,
  },
  schedule: {
    type: [scheduleItemSchema],
  },
  status: {
    type: String,
  },
  archived: {
    type: Boolean,
  },
  slug: {
    type: String,
  },
  deleted_at: {
    type: Date,
    default: null,
  },
});
cohortSchema.pre("find", function () {
  // binding this keyword, do not use arrow func
  this.where({ deleted_at: null });
});
cohortSchema.pre("findOne", function () {
  this.where({ deleted_at: null });
});
cohortSchema.pre("findByIdAndUpdate", function () {
  this.where({ deleted_at: null });
});
cohortSchema.plugin(mongooseHidden);

cohortSchema.methods.calculateEndDate = function () {
  //if no start date, throw error
  if (!this.start_date) {
    throw new Error("start_date is needed to calculate end date");
  }

  if (!this.schedule || !Array.isArray(this.schedule)) {
    throw new Error("schedule is needed to calculate end date");
  }

  //set end_date to be start date + (length of schedule + 1) * weeks
  this.end_date = addWeeks(this.start_date, this.schedule.length + 1);
};

cohortSchema.methods.calculateStatus = function () {
  //if no start date, throw error
  if (!this.start_date) {
    throw new Error("start_date is needed to calculate status");
  }

  //get current date
  const now = new Date();

  //recalculate end date just in case
  this.calculateEndDate();

  //if current date is before start date, return 'future'
  if (now < this.start_date) {
    this.status = "future";
    return;
  }

  //if current date is after end date, return 'past',
  if (now > this.end_date) {
    this.status = "past";
    return;
  }

  //otherwise return 'active'
  this.status = "active";
  return;
};


cohortSchema.statics.getBySlug = function (slug) {
  // refers to entire model
  return this.findOne({ slug: slug })
    .populate([
      {
        // cohort -->course
        path: "course",
        model: "Course",
        select: "course_name",
      },
      {
        // cohort -->schedule-->section
        path: "schedule",
        model: "Section",
        select: "title",
        populate: {
          path: "section",
          model: "Section",
          select: "title order",
        },
      },
      {
        // cohort -->schedule-->lesson
        path: "schedule",
        model: "Lesson",
        // select: "title",
        populate: {
          path: "lesson",
          model: "Lesson",
          populate: {
            path: "assignments materials section",
          },
        },
      },
    ])
    .exec()
}

export default mongoose.models.Cohort || mongoose.model("Cohort", cohortSchema)
