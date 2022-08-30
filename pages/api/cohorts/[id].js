import Cohort from "../../../lib/models/Cohort";
import dbConnect from "../../../lib/dbConnect";
import mongoose from "mongoose";


export default async function handler(req, res) {
    const { method } = req;
    const id = req.query.id;
    await dbConnect();
    switch (method) {
        case 'GET':
            try {
                const cohort = await Cohort.find({ _id: mongoose.Types.ObjectId(id) });
                res.status(200).json({ cohort: cohort })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'DELETE':
            try {
                const result = await Cohort.deleteOne(
                    { _id: mongoose.Types.ObjectId(id) }
                )
                res.status(201).json({ success: true, data: { deleted: result.deletedCount } })
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

