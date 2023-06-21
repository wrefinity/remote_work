import mongoose from "mongoose";
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
    deliveryTime:{
        type:String,
    },
    image:{
        type:String,
    },
    isSeller:{
        type: Boolean,
        default:false
    },
    verified:{
        type: Boolean,
        default:false
    },
    isDeleted:{
        type: Boolean,
        default:false
    },
}, {timestamps:true})


const UserModel = mongoose.model("User", userSchema);
export default UserModel;