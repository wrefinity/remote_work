import customError from "../utils/errors.js";
import Interaction from "../models/interactions.js";

class InteractRepo {

    createInteractions = async (req, res, next) => {

        try {
            const created = await Interaction.create({
                id: req.isSeller ? req.userId + req.body.to : req.body.to + req.userId,
                sellerId: req.isSeller ? req.userId : req.body.to,
                buyerId: req.isSeller ? req.body.to : req.userId,
                readBySeller: req.isSeller,
                readByBuyer: !req.isSeller,
            });

            res.status(201).send(created);
        } catch (error) {
            if (error.name === 'MongoServerError' && error.code === 11000) {
                res.status(200).json("conversation created ")
            }
        }
    };

    updateInteraction = async (req, res, next) => {
        try {
            const { id } = req.params
            const updated = await Interaction.findOneAndUpdate(
                { _id: id },
                {
                    $set: {
                        ...(req.isSeller ? { readBySeller: true } : { readByBuyer: true }),
                    },
                },
                { new: true }
            );

            res.status(200).send(updated);
        } catch (err) {
            next(err);
        }
    };

    getSingleInteraction = async (req, res, next) => {
        try {
            const interaction = await Interaction.findOne({ id: req.params.id });
            if (!interaction) return next(customError(404, "Not found!"));
            res.status(200).send(interaction);
        } catch (err) {
            next(err);
        }
    };

    getInteractions = async (req, res, next) => {
        try {
            const interactions = await Interaction.find(
                req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }
            ).sort({ updatedAt: -1 });
            res.status(200).send(interactions);
        } catch (err) {
            next(err);
        }
    };
}

export default new InteractRepo()