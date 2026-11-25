import doctorModel from "../models/doctorModel.js";
import appoinmentModel from "../models/appointmentModel.js"
import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import userModel from "../models/doctorModel.js";


const addDoctor = async (req, res) => {
    try {
        const {
            name, email, password, degree, fees, speciality,
            experience, about, address
        } = req.body;
        const imageFile = req.file;
        if (!imageFile) {
            return res.json({ success: false, message: "image is required" });
        }
        if (!name || !email || !password || !degree || !fees || !speciality || !experience || !about || !address) {
            return res.json({ success: false, message: "all the fields are required" });
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "please give a correct email" })
        }
        if (password.length < 6) {
            return res.josn({ success: false, message: "length of password should be greatter then 6" });
        }
        const solt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, solt);
        const uploadImage = await cloudinary.uploader.upload(imageFile.path, {
            resource_type: "image"
        })
        const imageurl = uploadImage.secure_url;
        const newDoctor = await doctorModel.create({
            name,
            email,
            password: hashedPassword,
            image: imageurl,
            degree,
            fees: Number(fees),
            speciality,
            about,
            experience,
            address,
            date: new Date().toLocaleDateString()
        })
        if (!newDoctor) {
            return res.json({ success: false, message: "doctor is not created" });
        }
        return res.status(200).json({ success: true, message: "doctor is created" });
    }
    catch (error) {
        return res.status(501).json({ message: error.message });
    }
}

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ success: false, message: "please enter email or password" });
        }
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            return res.json({ success: true, message: "admin login successfull", token });
        }
        else {
            return res.json({ success: false, message: "incorrect credential" })
        }
    }
    catch (error) {
        return res.status(501).json({ success: false, message: error.message });
    }
}

const getAllDoctor = async (req, res) => {
    try {
        const allDoctor = await doctorModel.find({}).select('-password');
        if (!allDoctor) {
            return res.json({ success: false, message: 'doctors not found' });
        }
        return res.json({ success: true, allDoctor });
    }
    catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

const changeAvaliablity = async (req, res) => {
    try {
        const { docid } = req.body;
        if (!docid) {
            return res.json({ success: false, message: 'please give a doctor-id' });
        }
        const doctor = await doctorModel.findById(docid);
        const updatedDoctor = await doctorModel.findByIdAndUpdate(docid, {
            available: !doctor.available
        })

        return res.json({ success: true, message: "changed avaliablity" })
    }
    catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

const getAllAppointments = async (req, res) => {
    try {
        const appointmentList = (await appoinmentModel.find({})).reverse();
        if (!appointmentList) {
            return res.json({ success: false, message: "no appointment found" });
        };
        return res.json({ success: true, appointmentList });
    }
    catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

const cancelAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        if (!appointmentId) {
            return res.json({ success: false, message: 'appointment id not found' });
        }
        const appointment = await appoinmentModel.findById(appointmentId);
        if (!appointment) {
            return res.json({ success: false, message: 'appointment not found' });
        }
        if (appointment.cancelled) {
            return res.json({ success: false, message: 'appointment has been cancelled' });
        }
        if (appointment.isCompleted) {
            return res.json({ success: false, message: 'appointment completed' });
        }
        await appoinmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

        const { doctorId, slotTime, slotDate } = appointment;
        const doctor = await doctorModel.findById(doctorId);

        let slot_time = doctor.slot_time;
        if (slot_time[slotDate].includes(slotTime)) {
            slot_time[slotDate] = slot_time[slotDate].filter(time => slotTime !== time);
        }

        await doctorModel.findByIdAndUpdate(doctorId, { slot_time });

        return res.json({ success: true, message: 'appoinment successfully cancelled' })
    }
    catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

const getDashBoardData = async (req,res) => {
    try {
        const doctor = await doctorModel.find({});
        const users = await userModel.find({});
        const appointment = await appoinmentModel.find({});
        
        const dashData = {
            doctorLength: doctor.length,
            userLength: users.length,
            appointmentLength: appointment.length,
            latestAppointments: appointment.reverse().slice(0,5)
        };

        return res.json({success: true, dashData});
    } 
    catch (error) {
        return res.json({success:false, message: error.message});
    }
} 


export { addDoctor, adminLogin, getAllDoctor, changeAvaliablity, 
    getAllAppointments, cancelAppointment, getDashBoardData
}

