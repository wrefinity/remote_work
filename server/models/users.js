import mongoose from "mongoose";
import bcrypt from "bcrypt";

const {Schema} = mongoose;

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
    },
    description:{
        type:String,
    },
    image:{
        type:String,
    },
    isWorker:{
        type: Boolean,
        default:false
    },
}, {timestamps:true})


const UserModel = mongoose.model("User", userSchema);
export default UserModel;