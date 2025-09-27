
import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    _id:{type:String , required: true},
    name: {type: String , required: true},
    email: {type: String , required: true, unique: true},
    imageUrl: {type: String , required: true},
    chartItems: {type: Object, default: {}}
}, {timestamps: true , minimize: false})

export const Users = mongoose.model.Users || mongoose.model("Users" , UserSchema)