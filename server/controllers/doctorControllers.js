import doctorModel from "../models/doctorModel.js";
import appoinmentModel from "../models/appointmentModel.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const doctorlist = async (req,res) => {
    try {
        const allDoctors = await doctorModel.find({}).select(['-password', '-email']);
        if(!allDoctors){
            return res.json({success:false, message:'doctors not found'});
        }
        return res.json({success:true, allDoctors})
    } 
    catch (error) {
        return res.json({success:false, message: error.message});
    }
}

const doctorLogin = async (req,res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.json({success: false, message:'please provide email or password'});
        }
        const exsistedDoctor = await doctorModel.findOne({email});
        if(!exsistedDoctor){
            return res.json({success:false, message: "doctor with this email does't exist"});
        }
        const isPasswordTrue = await bcrypt.compare(password,exsistedDoctor.password);
        if(!isPasswordTrue){
            return res.json({success:false, message:'email or password is invalid'});
        }
        const token = await jwt.sign({id: exsistedDoctor._id}, process.env.JWT_SECRET);
        if(!token){
            return res.json({success:false, message:'token not generated'});
        }
        return res.json({success:true, token, message:'doctor login successfull'});
    } 
    catch (error) {
        return res.json({success:false, message:error.message});
    }
}

const appointmentsByDoctor = async (req,res) => {
    try {
        const {doctorId} = req.body;
        if(!doctorId){
            return res.json({success:false, message: 'please provide doctor id'});
        }
        const appointments = await appoinmentModel.find({doctorId}).select('-userId');

        if(!appointments){
            return res.json({success:false, message: 'appointments not found'});
        }
        return res.json({success:true, appointments});
    } 
    catch (error) {
        return res.json({success:false, message:error.message});
    }
}

const completeAppointment = async (req,res) => {
    try {
        const {doctorId, appointmentId} = req.body;
        if(!doctorId || !appointmentId){
            return res.json({success:false, message: "provide doctor or appointment id"});
        }
        let appointment = await appoinmentModel.findById(appointmentId);

        if(!appointment){
            return res.json({success:false, message: "there is no appointment"});
        }

        if(appointment.cancelled || appointment.isCompleted ){
            return res.json({success:false, message: "appoitment completed or cancelled"});
        }

        if(doctorId != appointment.doctorId){
            return res.json({success:false, message: "doctor missmatch"});
        }
        await appoinmentModel.findByIdAndUpdate(appointmentId,{ 
            isCompleted: true,
            payment: true
        });

        return res.json({success: true, message: 'appointment has been completed'});

    } 
    catch (error) {
        return res.json({success: false, message: error.message});
    }
}

const cancelAppointment = async (req,res) => {
    try {
        const {doctorId, appointmentId} = req.body;
        if(!doctorId || !appointmentId){
            return res.json({success:false, message: "provide doctor or appointment id"});
        }
        const appointment = await appoinmentModel.findById(appointmentId);
        const doctor = await doctorModel.findById(doctorId);
        if(!appointment){
            return res.json({success:false, message: "there is no appointment"});
        }
        if(!doctor){
            return res.json({success:false, message: "doctor not found"});
        }
        if(appointment.cancelled || appointment.isCompleted ){
            return res.json({success:false, message: "appoitment completed or cancelled"});
        }

        if(doctorId != appointment.doctorId){
            return res.json({success:false, message: "doctor missmatch"});
        }
        await appoinmentModel.findByIdAndUpdate(appointmentId,{ 
            cancelled: true
        });
        
        let slot_time = doctor.slot_time;

        if(slot_time[appointment.slotDate].includes(appointment.slotTime)){
            slot_time[appointment.slotDate] = slot_time[appointment.slotDate].filter(time => appointment.slotTime != time);
        }

        await doctorModel.findByIdAndUpdate(doctorId,{slot_time});

        return res.json({success:true, message: "appointment cancelled"});
    } 
    catch (error) {
        return res.json({success: false, message: error.message});
    }
}

const doctorDashBoard = async (req,res) => {
    try {
        const {doctorId} = req.body;
        if(!doctorId){
            return res.json({success:false, message: 'please provide doctor id'});
        }
        const doctorAppointment = await appoinmentModel.find({doctorId}).select('-doctorData  -doctorId -userId');
        if(!doctorAppointment){
            return res.json({success:false, message:'appointment not found'});
        }
        let totalEarning = 0;
        doctorAppointment.map((appoinment) => {
            if(appoinment.payment || appoinment.isCompleted){
                totalEarning += appoinment.fees;
            }
        });
        let completeAppoinments = [];
        doctorAppointment.map((item) => {
            if(item.isCompleted){
                completeAppoinments.push(item);
            }
        });
        const latestAppointment = doctorAppointment.reverse().slice(0,5);
        
        const doctorDashData = {
            totalEarning,
            completeAppoinments: completeAppoinments.length,
            latestAppointment
        }

        return res.json({success: true, doctorDashData});
    } 
    catch (error) {
        return res.json({success:false, message: error.message});
    }
}

const doctorProfile = async (req,res) => {
    try {
        const {doctorId} = req.body;
        if(!doctorId){
            return res.json({success:false, message:'doctor id not found'});
        }

        const docProfile = await doctorModel.findById(doctorId).select('-password');

        if(!docProfile){
            return res.json({success:false, message:'doctor not found'});
        }

        return res.json({success:true, docProfile});
    } 
    catch (error) {
        return res.json({success:false, message:error.message});
    }
}

const updateDocProfile = async (req,res) => {
    try {
        const {doctorId,fees,available,address} = req.body;
        if(!doctorId){
            return res.json({success:false, message:'doctor id not found'});
        }
        const updatedProfile = await doctorModel.findByIdAndUpdate(doctorId,{fees,available,address});

        if(!updatedProfile){
            return res.json({success:false, message:'profile not updated'});
        }

        return res.json({success:true, updatedProfile, message: 'doctor profile updated'});
    } 
    catch (error) {
        return res.json({success:false, message:error.message});
    }
}

export {
    doctorlist,doctorLogin,appointmentsByDoctor,
    completeAppointment, cancelAppointment,doctorDashBoard,
    doctorProfile,updateDocProfile
};
