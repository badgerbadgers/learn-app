import Staticpage from "../../lib/models/StaticPage"
import dbConnect from "../../lib/dbConnect"

export default async function handler(req, res) {
  const { method } = req
  await dbConnect()
  switch (method) {
    case "GET":
      await getStaticPages(res)
      return
    //todo: slug
    //slug: obj.cohortName.trim().replaceAll(" ", "-").toLowerCase(),
    case "PATCH":
      await updateStaticPages(req, res)
    default:
      res.setHeader("Allow", ["GET", "PATCH"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

const getStaticPages = async (res) => {
  let newpages = []
  try {
    newpages = await Staticpage.find({}).exec()
    console.log("newpages", newpages)
    res.status(200).json({ success: true, data: JSON.stringify(newpages) })
  } catch (error) {
    console.error(error)
    res.status(400).json({ success: false })
  }
  // return res
}

const updateStaticPages = async (req, res) => {
  let newpages = []
  const filter = { wordpress_id: req.body.id }
  const update = { deleted_at: req.body.deleted }
  try {
    let newpages = await Staticpage.findOneAndUpdate(filter, update)
    // console.log("newpages", newpages)
    res.status(200).json({ success: true, data: JSON.stringify(newpages) })
    console.log(newpages)
  } catch (error) {
    console.error(error)
    res.status(400).json({ success: false })
  }
}
