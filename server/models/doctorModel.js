import mongoose, { Types } from "mongoose";

const doctorSchema = new mongoose.Schema({
    name:{type: String, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    image: {type: String, required: true},
    degree: {type: String, required: true},
    speciality: {type: String, required: true},
    experience: {type: String, required: true},
    fees: {type: Number, required: true},
    about: {type: String, required: true},
    address: {type: String, required: true},
    date: {type: String, required: true},
    available: {type: Boolean, default: true},
    slot_time: {type: Object, default: {}},
},{minimize: false})

const userModel = mongoose.models.doctor || mongoose.model('doctor',doctorSchema);
export default userModel;