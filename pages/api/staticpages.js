import Staticpage from "../../lib/models/StaticPage"
import dbConnect from "../../lib/dbConnect"
import Cohort from "../../lib/models/Cohort"

export default async function handler(req, res) {
  const { method } = req
  await dbConnect()
  switch (method) {
    case "GET":
      await getStaticPages(res)
      return
    //todo: slug
    //slug: obj.cohortName.trim().replaceAll(" ", "-").toLowerCase(),
    case "POST":
      await getStaticPages(req, res)
    default:
      res.setHeader("Allow", ["GET", "POST"])
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
