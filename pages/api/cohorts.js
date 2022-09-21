const { ObjectId } = require('mongodb');

import Cohort from "../../lib/models/Cohort";
import dbConnect from "../../lib/dbConnect";

export default async function handler(req, res) {
    const { method } = req;
    await dbConnect()
    switch (method) {
        case "GET":
            return await getCohorts(req, res);
        case "POST":
            return await createCohort(req, res);
        default:
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
};

const getCohorts = async (req, res) => {
    let cohorts = [];
    try {
        cohorts = await Cohort.find({}).populate("course", "_id course_name").exec();
        res.status(200).json({ success: true, data: JSON.stringify(cohorts) })
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false })
    }
    return res

};

const createCohort = async (req, res) => {
    try {
        const cohortToDb = await sanitize(JSON.parse(req.body.body));
        console.log("REQ", req.body)
        console.log("COHORT to db", cohortToDb)
        const existingCohortName = await Cohort.findOne({
            cohort_name: cohortToDb.cohort_name
        })
        if (existingCohortName) {
            const error = {
                error: "Cohort name is not unique"
            }
            res.status(400).json({
                success: false,
                message: error
            });
            return;
        }
        const cohort = await Cohort.create(cohortToDb)
        if (!cohort) {
            return res.status(400).json({ success: false })
        }
        console.log("created cohort =>", cohort);
        res.status(200).json({ success: true, data: cohort })
    } catch (error) {
        console.log("ERRRR", error);
        console.log("ERRRR MESS ====>", error.message);
        const errors = {};
        Object.entries(error.errors).forEach(([k, v]) => {
            errors[k] = v.message
        })

        return res.status(400).json({
            success: false,
            message: errors
        });
        // }
    }
    return res
};

const sanitize = async (obj) => {
    console.log()
    return {
        cohort_name: obj.cohortName,
        course: obj.courseName ? ObjectId(obj.courseName) : null,
        start_date: obj.startDate ? new Date(obj.startDate) : null,
        seats: obj.seats || 0,
        slug: obj.cohortName.trim().replaceAll(' ', '-').toLowerCase(),
        created_at: obj.created_at ? obj.created_at : new Date(),
    }
};
