import Cohort from "../../../lib/models/Cohort";
import dbConnect from "../../../lib/dbConnect";
import mongoose from "mongoose";

export default async function handler(req, res) {
    const { method } = req;
    const id = req.query.id;
    await dbConnect();
    switch (method) {
        case "GET":
            try {
                const cohort = await Cohort.find({ _id: mongoose.Types.ObjectId(id) });
                res.status(200).json({ cohort: cohort })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case "POST": 
        try {
            const cohortToDb = await sanitize(JSON.parse(req.body.body));
            console.log("cohort to db", cohortToDb);
            const existingCohortName = await Cohort.find({
                cohort_name: cohortToDb.cohort_name,
                _id: { $ne: cohortToDb._id},
            });
            if (existingCohortName.lenght) {
                const error = {
                    error: "Cohort name is not unique"
                }
                res.status(400).json({
                    success: false,
                    message: error
                });
                return;
            }
            
            const cohort = await Cohort.findByIdAndUpdate(id,  cohortToDb, {runValidators: true});
            console.log("COHORT BACK", cohort);
            if (!cohort) {
              return res.status(400).json({ success: false })
            }
            res.status(200).json({ success: true, data: cohort })
          } catch (error) {
            console.log(error);
            console.log(error.errors);

            const errors = {};
            Object.entries(error.errors).forEach(([k,v]) => {
                errors[k] = v.message
            })
            console.log('errors=', errors);
            return res.status(400).json({
                success: false,
                message: errors,
            });
          }
          break
        case "DELETE":
            console.log("DEL REQ =>", req)
            try {
                const deletedCohort = await Cohort.deleteOne(
                    { _id: mongoose.Types.ObjectId(id) }
                );
                if (!deletedCohort) {
                    return res.status(400).json({ success: false })
                  };
                res.status(201).json({ success: true, data: { deleted: deletedCohort.deletedCount } })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
    return res;
}

const sanitize = async (obj) => {
    return {
        cohort_name: obj.cohortName,
        course: obj.courseName,
        start_date: obj.startDate ? new Date(obj.startDate) : null,
        seats: obj.seats || 0,
        slug: obj.cohortName.trim().replaceAll(' ', '-').toLowerCase(),
    }
}
