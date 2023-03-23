/**
 * @swagger
 * tags:
 *   name: Static pages
 * /api/v1/staticpages:
 *   get:
 *     description: Returns all staticpages with isShown = true
 *     tags: [Static pages]
 *     parameters:
 *        - name: wordpress_id
 *          type: number
 *          required: true
 *        - name: isShown
 *          type: boolean
 *          required: false
 *        - name: slug
 *          type: string
 *          required: false
 *        - name: title
 *          type: string
 *          required: false
 *     responses:
 *       200:
 *         description: Provides an array of static pages
 *       400:
 *         description: Error messages
 *   post:
 *     summary: work in Progress
 *     description: Create the staticpage
 *     tags: [Static pages]
 */

import Staticpage from "/lib/models/StaticPage";
import dbConnect from "lib/dbConnect";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const staticpages = await getStaticPages(req.query);
        res.status(200).json({ data: staticpages });
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false });
      }
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export const getStaticPages = async (filters = {}) => {
  try {
    await dbConnect();

    //build mongo query using filters
    const mongoFilter = {};
    if (!!filters.isShown) {
      mongoFilter.isShown = { $eq: true };
    }

    // const isShownMongoPages = [];
    // try {
    //   const isShownMongoPages = await Staticpage.find({ isShown: true });
    //   res.status(200).json({
    //     success: true,
    //     data: isShownMongoPages,
    //   });
    // } catch (error) {
    //   res.status(400).json({ success: false });
    // }
    //query mongo and return result
    const staticpages = await Staticpage.find(mongoFilter)
      // .lean();
      .populate("isShown")
      .exec();
    return staticpages;
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false });
  }
};
// export default async function handler(req, res) {
//   const { method } = req;

//   switch (method) {
//     case "GET":
//       try {
//         //call method for getting cohorts with any parameters we received
//         const cohorts = await getCohorts(req.query);
//         res.status(200).json({ data: cohorts });
//       } catch (error) {
//         console.error(error);
//         res.status(400).json({ message: error.message });
//       }
//       return;
//     case "POST":
//       return await createCohort();
//     default:
//       res.setHeader("Allow", ["GET", "POST"]);
//       res.status(405).end(`Method ${method} Not Allowed`);
//   }
// }

// export const getCohorts = async (filters = {}) => {
//   try {
//     await dbConnect();

//     //build mongo query using filters
//     const mongoFilter = {};
//     if (!!filters.status) {
//       mongoFilter.status = filters.status;
//     }

//     if (!!filters.course) {
//       mongoFilter.course = filters.course;
//     }

//     if (!!filters.deleted) {
//       mongoFilter.deleted_at = { $ne: null };
//     }

//     //query mongo and return result
//     const cohorts = await Cohort.find(mongoFilter)
//       .populate("course", "_id course_name")
//       .exec();
//     return cohorts;
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ success: false });
//   }
// };

// const createCohort = async () => {
//   throw new Error("WIP");
// };
