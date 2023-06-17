import mongoose from "mongoose";
const { Schema } = mongoose;

const MessageSchema = new Schema({
  interactionId: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  message: {
    type: String,
    required: true,
  },
},{
  timestamps:true
});

export default mongoose.model("Message", MessageSchema)