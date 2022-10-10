import Cohort from "../../../lib/models/Cohort";
import Course from "../../../lib/models/Course";
import Lesson from "../../../lib/models/Lesson";
import dbConnect from "../../../lib/dbConnect";

export default async function handler(req, res) {
    const { method } = req;
    const id = req.query.id;
    await dbConnect();
    switch (method) {
        case "GET":
            try {
                const cohort = await Cohort.findById(id).exec();    // API won't return cohorts with time stapm in property deleted_at        
                res.status(200).json({ cohort: cohort })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break

        case "POST":
            try {
                const cohortToDb = await sanitize(JSON.parse(req.body.body));
                const existingCohortName = await Cohort.find({
                    cohort_name: cohortToDb.cohort_name,
                    _id: { $ne: cohortToDb._id }, // to exclude the current cohort
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

                const checkCourseId = await Course.findById(cohortToDb.course)

                if (!checkCourseId) {
                    const error = {
                        error: "Course does not exist"
                    }
                    res.status(400).json({
                        success: false,
                        message: error
                    });
                    return;
                }
                cohortToDb.schedule = await createSchedule(cohortToDb.course);
                const cohort = await Cohort.findByIdAndUpdate(id, cohortToDb, { runValidators: true });

                if (!cohort) {
                    return res.status(400).json({ success: false })
                }
                res.status(200).json({ success: true, data: cohort })
            } catch (error) {
                console.log(error);
                const errors = {};
                Object.entries(error.errors).forEach(([k, v]) => {
                    errors[k] = v.message
                })
                return res.status(400).json({
                    success: false,
                    message: errors,
                });
            }
            break

        case "DELETE":
            try {
                const deletedCohort = await Cohort.findByIdAndUpdate(id, { deleted_at: new Date() });
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

const createSchedule = async (courseId) => {
    let schedule = [];
    try{
        let lessonsInCourse = await Course.findOne({
            _id: courseId
        }, "lessons");
        lessonsInCourse = lessonsInCourse.lessons;
        const sortedLessons = await Lesson
            .find( {_id:{$in:lessonsInCourse}})
            .select({ _id: 1, order: 1, section:1 })
            .sort({order:1});
        sortedLessons.map( l => schedule.push( {
            lesson: l._id,
            type:"lesson",
            section: l.section,
        }))


    }catch (error){
        console.log(error, "Can't fetch lessons from course");
    }

    return schedule
}