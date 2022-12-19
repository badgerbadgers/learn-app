import Staticpage from "../../lib/models/StaticPage"
import dbConnect from "../../lib/dbConnect"

var mongoose = require("mongoose")
export default async function handler(req, res) {
  const { method } = req
  await dbConnect()
  switch (method) {
    //todo: slug
    //slug: obj.cohortName.trim().replaceAll(" ", "-").toLowerCase(),
    case "PATCH":
      await updateStaticPages(req, res)
      return
    case "POST":
      await createStaticPages(req, res)
      return
    default:
      res.setHeader("Allow", ["PATCH", "POST"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

const createStaticPages = async (req, res) => {
  console.log("req body", req.body)
  const body = req.body
  //check if mongoid exist if exist update bool
  //if no mongoid exist create new id
  //nested obj property gets wp_id passed as req.body from front end
  // console.log("req id", req.body.body.wp_id)
  // console.log("req shown", req.body.body.isShown)
  const bool = body.isShown
  const id = body.wp_id
  const title = body.title
  const filter = { wordpress_id: id }
  const update = {
    wordpress_id: id,
    isShown: bool,
    title: title,
  }
  //new mongoDB_id (_id)
  // let new_mongo_id = mongoose.Types.ObjectId()

  //next steps
  //find wpid from browser, second param obj i want wp_id title and bool switch if switch on deleted at is null, if switch is off (deleted it) deleted_at should be timestamp, tell set what object should look like, third parameter is to set upsert to true, which will create new object if it doesnt find it.
  const newpages = []

  //if wp ids match then check if mongo id exist
  try {
    const newpages = await Staticpage.findOneAndUpdate(filter, update, {
      upsert: true,
    })
    res.status(200).json({ success: true, data: JSON.stringify(newpages) })
  } catch (error) {
    console.error(error)
    res.status(400).json({ success: false })
  }
}

// const updateStaticPages = async (req, res) => {
//   let newpages = []
//   const filter = { wordpress_id: req.body.id }
//   const update = { isShown: req.body.deleted }
//   try {
//     let newpages = await Staticpage.findOneAndUpdate(filter, update)
//     // console.log("newpages", newpages)
//     res.status(200).json({ success: true, data: JSON.stringify(newpages) })
//     console.log(newpages)
//   } catch (error) {
//     console.error(error)
//     res.status(400).json({ success: false })
//   }
// }
