import Order from "../models/order.js";
import Job from "../models/job.js";
// import Stripe from "stripe";


class OrderClass{
    intent = async (req, res, next) => {
        const job = await Job.findById(req.params.id);
        // const stripe = new Stripe(process.env.STRIPE);
        // // const paymentIntent = await stripe.paymentIntents.create({
        //     amount: job.price * 100,
        //     currency: "usd",
        //     automatic_payment_methods: {
        //         enabled: true,
        //     },
        // });
    
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

