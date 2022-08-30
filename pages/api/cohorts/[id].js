import Cohort from "../../../lib/models/Cohort";
import dbConnect from "../../../lib/dbConnect";
import mongoose from "mongoose";


export default async function handler(req, res) {
    const { method } = req

    await dbConnect()

    const id = req.query.id
    switch (method) {
        case 'GET':
            try {
                const cohort = await Cohort.find({_id: mongoose.Types.ObjectId(id) }) /* find all the data in our database */
                res.status(200).json({cohort: cohort})
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'DELETE':
            // console.log(req, "Request delete")
            console.log(id, "ID")
            try {

                const result = await Cohort.deleteOne(
                    {_id: mongoose.Types.ObjectId(id) }
                )
                res.status(201).json({ success: true, data: { deleted: result.deletedCount } })
            } catch (error) {
                console.log(error);
                res.status(400).json({ success: false })
            }
            // res.status(200);
            break
        default:
            res.status(400).json({ success: false })
            break
    }
    return res;
}

