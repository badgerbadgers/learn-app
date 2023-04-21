const { ObjectId } = require("mongodb");
const { faker } = require("@faker-js/faker");
module.exports = [
  {
    _id: ObjectId("62e056cee6daad619e5cc2c3"),
    course_name: "Rails",
    airtable_id: "rec4JVTXk83ZX5hrx",
    slug: "rails",
    lessons: [],
  },
  {
    _id: ObjectId("62e056cee6daad619e5cc2c4"),
    course_name: "React",
    airtable_id: "recJEEWEWWfTsNVmx",
    slug: "react",
    lessons: [],
  },
  {
    _id: ObjectId("62e056cee6daad619e5cc2c5"),
    course_name: "Intro to Programming",
    airtable_id: "recV462SB1JhNjQ76",
    slug: "intro-to-programming",
    lessons: [
      ObjectId("62e26dbb69dd077fc82fbfe5"),
      ObjectId("62e26dbb69dd077fc82fbfe1"),
      ObjectId("62e26dc769dd077fc82fc017"),
      ObjectId("62e26dc669dd077fc82fc00b"),
      ObjectId("62e26dbb69dd077fc82fbfe6"),
      ObjectId("62e26dc669dd077fc82fc006"),
      ObjectId("62e26dbb69dd077fc82fbfe8"),
      ObjectId("62e26dc669dd077fc82fbffa"),
      ObjectId("62e26dc569dd077fc82fbff8"),
      ObjectId("62e26dc569dd077fc82fbff3"),
      ObjectId("62e26dc669dd077fc82fbffe"),
      ObjectId("62e26dc669dd077fc82fbffb"),
      ObjectId("62e26dc669dd077fc82fc00a"),
      ObjectId("62e26dbb69dd077fc82fbfe4"),
      ObjectId("62e26dc569dd077fc82fbff7"),
      ObjectId("62e26dc669dd077fc82fc000"),
    ],
  },
  {
    _id: ObjectId("22e056cee6daad619e5cc2c4"),
    course_name: "React deleted",
    airtable_id: "recJEEWEWWfTsNVmx",
    slug: "react-deleted",
    lessons: [],
    deleted_at: faker.date.recent()
  },
];
