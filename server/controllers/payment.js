import Order from "../models/order.js";
import Job from "../models/job.js";
import customError from "../utils/errors.js";


class OrderClass {
    intent = async (req, res, next) => {
        const job = await Job.findById(req.params.id);
        const counter = 1;
        await Job.updateOne(
            { _id: job._id },
            { $inc: { sales: counter }},
            { new: true }
          ).exec();

        await Order.create({
            jobId: job._id,
            image: job.cover,
            title: job.title,
            buyerId: req.userId,
            sellerId: job.userId,
            price: job.price,
        });

        res.status(200).send("order created");
    };

    getOrders = async (req, res, next) => {
        try {
            const orders = await Order.find({
                ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
                isDeleted: false,
            });

            res.status(200).send(orders);
        } catch (err) {
            next(err);
        }
    };
    deletePayments = async (req, res, next) => {
        try {
            console.log(req.params.id)

            const ord = await Order.findById(req.params.id);
            if (ord.buyerId !== req.userId)
                return next(customError(403, "you can only delete orders made by you"));

            await Order.findByIdAndDelete(req.params.id);
            res.status(200).send("Order has been deleted!");
        } catch (err) {
            console.log(err)
            next(err);
        }
    };
    confirm = async (req, res, next) => {
        try {
            const orders = await Order.findOneAndUpdate(
                {
                    payment_intent: req.body.payment_intent,
                },
                {
                    $set: {
                        isCompleted: true,
                    },
                }
            );
            if (orders)
                res.status(200).send("Order confirmed.");
        } catch (err) {
            next(err);
        }
    };
}


export default new OrderClass

