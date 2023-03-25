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
 *     description:: Creates a new static page
 *     tags: [Static pages]
 *    parameters:
 *      - wordpress_id: wp_id
 *        type: number
 *        required: true,
 *        unique: true
 *      - title: title
 *        type: string
 *      - isShown: null
 *        type: boolean
 *        default: null
 *      - slug: slug
 *        type: string
 *      
 */

import Staticpage from "/lib/models/StaticPage";
import dbConnect from "lib/dbConnect";
const { faker } = require("@faker-js/faker");

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const staticpages = await getStaticPages();
        res.status(200).json({ data: staticpages });
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false });
      }
      return;
    case "POST":
      try {
        //creates or updates a static page if it exist
        const staticpage = await createStaticPage(req.body);
        res.status(200).json({ data: staticpage });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
      return;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export const getStaticPages = async () => {
  try {
    await dbConnect();

    const staticpages = await Staticpage.find().exec();
    return staticpages;
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false });
  }
};

export const createStaticPage = async (data) => {
  let newstaticpage = [];
  let staticpage = {
    wordpress_id: data.wordpress_id,
    title: data.title,
    isShown: data.isShown,
    slug: data.slug,
  };
  try {
    await dbConnect();
    //create new static page with properties
    const newstaticpage = await Staticpage.create(staticpage);
  } catch (error) {
    console.log(error, "cant create new static page");
  }
  return newstaticpage;
};

// const createStaticPages = async (req, res) => {
//   const body = req.body;
//   const filter = { wordpress_id: body.wp_id };
//   const update = {
//     wordpress_id: body.wp_id,
//     isShown: body.isShown,
//     title: body.title,
//     slug: body.slug,
//   };

//   const newpages = [];
//   try {
//     const newpages = await Staticpage.altFindOneAndUpdate(filter, update, {
//       upsert: true,
//     });
//     res.status(200).json({ success: true, data: JSON.stringify(newpages) });
//   } catch (error) {
//     console.error(error);
//     res
//       .status(400)
//       .json({ "Please check ensure all your fields have valid data": error });
//   }
// };