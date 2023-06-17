import mongoose from "mongoose";
const { Schema } = mongoose;

const OrderSchema = new Schema(
    {
        jobId: {
            type: String,
            required: true,
        },
        sellerId: {
            type: String,
            required: true,
        },
        buyerId: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: false,
        },
        title: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },

        isCompleted: {
            type: Boolean,
            default: false,
        },
        ref_txt: {
            type: String,       
        },
        isDeleted:{
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Order", OrderSchema);
