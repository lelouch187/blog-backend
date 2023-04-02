import mongoose from "mongoose";


const UserSchema = mongoose.Schema({
   fullName:{type: String, required:true},
   email:{type: String, required:true, unique:true},
   password:{type: String, required:true},
   avatarURL:String
},{timestaps:true})

export default mongoose.model('User', UserSchema)