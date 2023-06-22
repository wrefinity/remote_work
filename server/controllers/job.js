import Job from "../models/job.js";
import customError from "../utils/errors.js";


class GigsRepo {
    createGig = async (req, res, next) => {
        if (!req.isSeller)
            return next(customError(403, "Only sellers can create a job!"));

        try {
            const created = await Job.create({
                userId: req.userId,
                ...req.body,
            });
            res.status(201).json(created);
        } catch (err) {
            next(err);
        }
    };
    deleteGig = async (req, res, next) => {
        try {
            const job = await Job.findById(req.params.id);
            if (job.userId !== req.userId)
                return next(customError(403, "you can only delete job created by you"));

            await Job.findByIdAndDelete(req.params.id);
            res.status(200).send("Job has been deleted!");
        } catch (err) {
            next(err);
        }
    };
    getGig = async (req, res, next) => {
        try {
            const job = await Job.findById(req.params.id);
            if (!job) next(customError(404, "Job not found!"));
            res.status(200).send(job);
        } catch (err) {
            next(err);
        }
    };
    getGigs = async (req, res, next) => {
        const q = req.query;
        const filters = {
            ...(q.userId && { userId: q.userId }),
            ...(q.cat && { cat: q.cat }),
            ...((q.min || q.max) && {
                price: {
                    ...(q.min && { $gt: q.min }),
                    ...(q.max && { $lt: q.max }),
                },
            }),
            ...(q.search && { title: { $regex: q.search, $options: "i" } }),
        };
        try {
            const jobs = await Job.find(filters).sort({ [q.sort]: -1 });
            res.status(200).send(jobs);
        } catch (err) {
            next(err);
        }
    };


}
export default new GigsRepo()