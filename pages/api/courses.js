import Course from "../../lib/models/Course";
import dbConnect from "../../lib/dbConnect";

// handler does not expect a return
// don't need to get since we are getting from serverside props  

export default async function handler(req, res) {
    /* if re(req.method !==Get){ 
    res.status.(405)
    }
    // grab the list name 
    // create a new list in mongo 
    ?returna result (1.success.id)

    or switch (req.method)

    for methods you will have to use mongoose methods 
    ex. POST method 
    const title= req.query.title 
    title is from mongoose modal 
    ex.findOneAndUpdate
    */
    const { method } = req;
    await dbConnect()

    switch (method) {
        case "GET":
            return getCourses(req, res);
        default:
            res.setHeader("Allow", ["GET"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}

const getCourses = async (req, res) => {
    let courses = [];
    try {
        courses = await Course.find({}).select({ course_name: 1, _id: 1 });                
        res.status(200).json({ success: true, data: JSON.stringify(courses) })
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false })
      }
      return res
};