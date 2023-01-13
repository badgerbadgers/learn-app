import mongoose from "mongoose";
import Course from "./Course";
import Section from "./Section";
import Lesson from "./Lesson";
import Assignment from "./Assignment";
import Material from "./Material"

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
  zoom_link: {
    type: String,
    default: "",
  },
  // students: [mongoose.Types.ObjectId],
  // mentors: [mongoose.Types.ObjectId],
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
    .exec();
};

export default mongoose.models.Cohort || mongoose.model("Cohort", cohortSchema);
