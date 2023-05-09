import mongoose from "mongoose";

const submissionLinkSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
    validate: {
      validator: (value) =>
        /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(
          value
        ),
      message: (props) => `Provided url - ${props.value} is not a valid url!`,
    },
  },
});

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
  },
  submission_link: submissionLinkSchema,

  learning_objectives: {
    type: [String],
  },
  mindset_content: {
    type: String,
  },
  materials: {
    type: [mongoose.Types.ObjectId],
    ref: "Material",
  },
  assignments: {
    type: [mongoose.Types.ObjectId],
    ref: "Assignment",
  },
  section: {
    type: mongoose.Types.ObjectId,
    ref: "Section",
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

lessonSchema.pre("find", filterDeletedItems);
lessonSchema.pre("findOne", filterDeletedItems);
// including the hook below won't let undeleting functionality
//lessonSchema.pre("findByIdAndUpdate", filterDeletedItems);

export default mongoose.models.Lesson || mongoose.model("Lesson", lessonSchema);
