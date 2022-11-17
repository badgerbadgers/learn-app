import mongoose from "mongoose"

// const mongooseHidden = require("mongoose-hidden")({
//   hidden: { ___v: true },
//   defaultHidden: { _id: false },
// })
const staticpagesSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
  },
  title: {
    type: String,
  },
  id: {
    type: Number,
  },
})

// module.exports =
//   mongoose.models.StaticPages ||
//   mongoose.model("StaticPages", staticpagesSchema)

// const page = new Page({
//   Slug: "Ryu",
//   Content: "Shinku Hadoken",
// })
