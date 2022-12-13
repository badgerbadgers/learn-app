import Staticpage from "../../lib/models/StaticPage"
import dbConnect from "../../lib/dbConnect"

export default async function handler(req, res) {
  const { method } = req
  await dbConnect()
  switch (method) {
    //todo: slug
    //slug: obj.cohortName.trim().replaceAll(" ", "-").toLowerCase(),
    case "PATCH":
      await updateStaticPages(req, res)
      return
    default:
      res.setHeader("Allow", ["PATCH"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
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
