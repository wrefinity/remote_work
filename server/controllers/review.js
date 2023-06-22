import customError from "../utils/errors.js";
import Review from "../models/review.js";
import Job from "../models/job.js";


class ReviewRepo {
    createReview = async (req, res, next) => {
        if (req.isSeller)
            return next(customError(403, "Sellers cant review a job!"));
        
        const { gigId, desc, star } = req.body

        try {
            // find a review base on user and job id 
            const review = await Review.findOne({
                gigId, userId: req.userId,
            });

            if (review)
                return next(
                    customError(403, "you have reviewed this job already!")
                );

            const savedReview = await Review.create({
                userId: req.userId,
                gigId,
                desc,
                star,
            });

            await Job.findByIdAndUpdate(req.body.gigId, {
                $inc: { totalStars: req.body.star, starNumber: 1 },
            });
            res.status(201).send(savedReview);
        } catch (err) {
            next(err);
        }
    };

    getReviews = async (req, res, next) => {
        const { gigId } = req.params
        try {
            const reviews = await Review.find({ gigId });
            res.status(200).send(reviews);
        } catch (err) {
            next(err);
        }
    };
    deleteReview = async (req, res, next) => {
        try {
        } catch (err) {
            next(err);
        }
    };

}

export default new ReviewRepo()