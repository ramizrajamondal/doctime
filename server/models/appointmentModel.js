import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    userId:{type: String, required: true},
    doctorId: {type: String, required: true},
    userData: {type: Object, required: true},
    doctorData: {type: Object, required: true},
    slotTime: {type: String, required: true},
    slotDate: {type: String, required: true},
    fees: {type: Number, required: true},
    cancelled: {type: Boolean, default: false},
    payment:{type: Boolean, default: false},
    isCompleted: {type: Boolean, default: false}
},{timestamps: true});

const appointmentModel = mongoose.models.appoinment || mongoose.model('appoinment',appointmentSchema)
export default appointmentModel;