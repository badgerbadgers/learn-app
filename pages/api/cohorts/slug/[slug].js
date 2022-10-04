import Cohort from "../../../../lib/models/Cohort";
import dbConnect from "../../../../lib/dbConnect";

export default async function handler(req, res) {
    const { method } = req;
    const slug = req.query.slug;
    await dbConnect();
    switch (method) {
        case "GET":
            try {
                const cohort = await Cohort.findOne({slug:slug}).exec();    // API won't return cohorts with time stapm in property deleted_at        
                res.status(200).json({ cohort: cohort })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
    }
}
