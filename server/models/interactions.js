import mongoose from "mongoose";

const { Schema } = mongoose;
const InteractionSchema = new Schema({

    id: {
        type: String,
        required: true,
        unique: true,
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    readBySeller: {
        type: Boolean,
        required: true,
    },
    readByBuyer: {
        type: Boolean,
        required: true,
    },
    lastMessage: {
        type: String,
        required: false,
    },
}, { timestamps: true })


const Interact = mongoose.model("Interaction", InteractionSchema)
export default Interact