import Assignment from "./Assignment";
import Course from "./Course";
import Lesson from "./Lesson";
import Material from "./Material";
import Section from "./Section";
import User from "./User";
import mongoose from "mongoose";
import { addWeeks } from "date-fns";

const addUsers = async function (cohort, field, value) {
  //find which of the provided users exist in users database
  const users = await User.find({ _id: { $in: value } }, "_id");
  // add field if cohort has set it to null
  if (!cohort[field]) {
    cohort[field] = [];
  }

  if (!users.length || value.length !== users.length) {
    throw new Error(
      "All users ids provided must be unique and exist in the data base"
    );
  }

  users.forEach((user) => {
    // if the user not in the field already, add them
    const isExistingUser = cohort[field].find(
      (u) => u.user?.toString() === user._id.toString()
    );

    if (!isExistingUser) {
      // check if the field is 'student' to add 'added_at' property
      if (field === "students") {
        cohort[field].push({ user: user._id, added_at: new Date() });
      } else {
        cohort[field].push({ user: user._id });
      }
    }
  });
  return cohort;
};

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
    required: [
      function () {
        return this.type === "lesson";
      },
      "Lesson is required",
    ],
  },
  content: {
    type: String,
    required: [
      function () {
        return this.type !== "lesson";
      },
      "Content is required",
    ],
    trim: true,
  },
  section: {
    type: mongoose.Types.ObjectId,
    ref: "Section",
    required: true,
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
      _id: false,
    },
  ],

  mentors: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
      _id: false,
    },
  ],

  seats: {
    type: Number,
    //Make it not required for now, because cohort-management page does not have option to add seats when creating cohort
    //required: true,
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

const filterDeletedItems = function () {
  const filters = this.getFilter();
  if (!("deleted_at" in filters)) {
    this.where({ deleted_at: null });
  }
};

cohortSchema.pre("find", filterDeletedItems);
cohortSchema.pre("findOne", filterDeletedItems);
cohortSchema.pre("findOneAndUpdate", filterDeletedItems);
cohortSchema.plugin(mongooseHidden);

// add mentors to cohort
cohortSchema.methods.updateMentors = function (idsList) {
  return addUsers(this, "mentors", idsList);
};

// add students to cohort
cohortSchema.methods.updateStudents = function (idsList) {
  return addUsers(this, "students", idsList);
};

cohortSchema.methods.calculateEndDate = function () {
  //if no start date, throw error
  if (!this.start_date) {
    console.warn("start_date is needed to calculate end date");
    this.end_date = null;
    return;
  }

  if (
    !this.schedule ||
    !Array.isArray(this.schedule) ||
    !this.schedule.length
  ) {
    console.warn("schedule is needed to calculate end date");
    this.end_date = null;
    return;
  }

  //set end_date to be start date + (length of schedule + 1) * weeks
  this.end_date = addWeeks(this.start_date, this.schedule.length + 1);
};

cohortSchema.methods.calculateStatus = function () {
  //if no start date, throw error
  if (!this.start_date) {
    console.warn("start_date is needed to calculate status");
    this.status = "unknown";
    this.end_date = null;
    return;
  }

  if (
    !this.schedule ||
    !Array.isArray(this.schedule) ||
    !this.schedule.length
  ) {
    console.warn("schedule is needed to calculate status");
    this.status = "unknown";
    this.end_date = null;
    return;
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

const updateStatusIfNeededQuery = async function () {
  const update = this.getUpdate();

  //if schedule or start_date are being updated, we will want to recalculate the end_date and status
  if ("schedule" in update || "start_date" in update) {
    //grab a copy of the document we are updating
    const dbCohort = await this.model.findOne(this.getQuery());
    if (!dbCohort) {
      return;
    }

    //overwrite schedule and start_date values as needed
    if ("schedule" in update) {
      dbCohort.schedule = this.getUpdate().schedule;
    }
    if ("start_date" in update) {
      dbCohort.start_date = this.getUpdate().start_date;
    }

    //recalculate status and end_date
    dbCohort.calculateStatus();

    //update this query to also update end_date and status
    this.set({
      end_date: dbCohort.end_date,
      status: dbCohort.status,
    });
  }
};

cohortSchema.pre("updateOne", updateStatusIfNeededQuery);
cohortSchema.pre("findOneAndUpdate", updateStatusIfNeededQuery);

cohortSchema.pre("save", async function () {
  //we're going to recalculate the value of end_date and status on every save,
  //regardless of whether start_date or schedule have changed,
  //because the status relied on the current date,
  //which changes even if no changes have been made to any fields
  this.calculateStatus();
  this.updateSlug();
});

const createSlug = function (name) {
  return name.trim().replaceAll(" ", "-").toLowerCase();
};

cohortSchema.methods.updateSlug = function () {
  this.slug = createSlug(this.cohort_name);
};

const updateSlugIfNeeded = async function () {
  const update = this.getUpdate();

  if ("cohort_name" in update) {
    //update this query to also update end_date and status
    this.set({
      slug: createSlug(update.cohort_name),
    });
  }
};
cohortSchema.pre("updateOne", updateSlugIfNeeded);
cohortSchema.pre("findOneAndUpdate", updateSlugIfNeeded);

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
