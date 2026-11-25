import userModel from "../models/userModel.js";
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { v2 as cloudinary } from "cloudinary"
import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";
import configRazorPay from "../config/razorpay.js";

export const userRegistration = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        if (!fullName || !email || !password) {
            return res.json({ sucess: false, message: "fill all the fields" })
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "please provide a valid email id" });
        }
        if (password.length < 6) {
            return res.josn({ success: false, message: "length of password should be greatter then 6" });
        }
        const solt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, solt);
        const newUser = await userModel.create({
            name: fullName,
            email,
            password: hashPassword
        })
        if (!newUser) {
            return res.josn({ success: false, message: "user is not registered" });
        }
        const token = await jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        if (!token) {
            return res.josn({ success: false, message: "token is not generated" });
        }
        return res.json({ success: true, message: "user registered successfully", token });
    }
    catch (error) {
        return res.json({ sucess: false, status: 501, message: error.message });
    }
}

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ success: false, message: "please provide email and password" });
        }
        const existUser = await userModel.findOne({ email });
        if (!existUser) {
            return res.json({ success: false, message: "user does't exist" });
        }
        const isPasswordTrue = await bcrypt.compare(password, existUser.password);
        if (!isPasswordTrue) {
            return res.json({ success: false, message: "email or password is invalid" });
        }
        const token = await jwt.sign({ id: existUser._id }, process.env.JWT_SECRET);
        if (!token) {
            return res.json({ success: false, message: "token not created" });
        }
        return res.json({ success: true, message: "user login successfull", token });
    }
    catch (error) {
        return res.json({ success: false, status: 501, message: error.message })
    }
}

export const getProfile = async (req, res) => {
    try {
        const { userId } = req.body;
        const profile = await userModel.findById(userId).select('-password');
        if (!profile) {
            return res.json({ success: false, message: "not getting the profile" })
        }
        return res.json({ success: true, profile });
    }
    catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { userId, name, phone, gender, dob, address } = req.body;
        const imageFile = req.file;
        if (!name || !phone || !gender || !dob || !address) {
            return res.json({ success: false, message: "incomplete data" })
        };
        const updatedUser = await userModel.findByIdAndUpdate(userId, {
            name,
            phone,
            gender,
            address,
            dob
        })
        if (imageFile) {
            const uploadImage = await cloudinary.uploader.upload(imageFile.path, {
                resource_type: "image"
            })
            const imageUrl = uploadImage.secure_url;
            await userModel.findByIdAndUpdate(userId, {
                image: imageUrl
            })
        }
        return res.json({ success: true, message: "user profile is updated" });
    }
    catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

export const bookAppointment = async (req, res) => {
    try {
        const { userId, doctorId, slotDate, slotTime } = req.body;
        if (!userId || !doctorId || !slotDate || !slotTime) {
            return res.json({ success: false, message: "provide all the details that need for booking an appoinment" });
        }
        const doctor = await doctorModel.findById(doctorId).select('-password');
        if (!doctor) {
            return res.json({ success: false, message: "doctor not found" });
        }
        if (!doctor.available) {
            return res.json({ success: false, message: "doctor is unavailable" });
        }

        const alreadyBooked = await appointmentModel.findOne({
            doctorId,
            slotDate,
            slotTime,
            cancelled: false
        })
        if (alreadyBooked) {
            return res.json({ success: false, message: "Slot is unavailable. Please choose another slot." });
        }
        let slot_time = doctor.slot_time;
        if (slot_time[slotDate]) {
            slot_time[slotDate].push(slotTime);
        }
        else {
            slot_time[slotDate] = [];
            slot_time[slotDate].push(slotTime);
        }

        const user = await userModel.findById(userId).select('-password');
        if (!user) {
            return res.json({ success: false, message: "user not found" });
        }
        const newAppointment = await appointmentModel.create({
            doctorId,
            userId,
            slotDate,
            slotTime,
            doctorData: doctor,
            userData: user,
            fees: doctor.fees,
        });
        if (!newAppointment) {
            return res.json({ success: false, message: "booking is not done" });
        }
        await doctorModel.findByIdAndUpdate(doctorId, {
            slot_time
        });
        return res.json({ success: true, message: 'Your appointment has been booked successfully.' });
    }
    catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

export const bookedAppointments = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.json({ success: false, message: 'invalid user' });
        }
        const allAppointment = await appointmentModel.find({ userId });
        if (!allAppointment) {
            return res.json({ success: false, message: 'No record found please book an appointment' });
        }
        return res.json({ success: true, allAppointment });
    }
    catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

export const cancelAppointment = async (req, res) => {
    try {
        const { appointmentId, userId } = req.body;
        if (!appointmentId || !userId) {
            return res.json({ success: false, message: 'please provide appoinment details' });
        }
        const appointment = await appointmentModel.findById(appointmentId);
        if (!appointment) {
            return res.json({ success: false, message: 'appointment not found' });
        }
        if (appointment.isCompleted) {
            return res.json({ success: false, message: 'appointment has been completed' });
        }
        if (appointment.cancelled) {
            return res.json({ success: false, message: 'appointment is already cancelled' });
        }
        if (appointment.userId !== userId) {
            return res.json({ success: false, message: 'unauthorized user' });
        }
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

        const { doctorId, slotTime, slotDate } = appointment;

        const doctor = await doctorModel.findById(doctorId);

        let slot_time = doctor.slot_time;
        if (slot_time[slotDate].includes(slotTime)) {
            slot_time[slotDate] = slot_time[slotDate].filter(time => slotTime !== time);
        }

        await doctorModel.findByIdAndUpdate(doctorId, {
            slot_time
        });

        return res.json({ success: true, message: 'appoinment successfully cancelled' });
    }
    catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

export const fessPayment = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        if (!appointmentId) {
            return res.json({ success: false, message: 'appointment id not found' });
        }
        const appointment = await appointmentModel.findById(appointmentId);
        if (!appointment || appointment.cancelled) {
            return res.json({ success: false, message: 'appointment not found or cancelled' });
        }

        const instance = configRazorPay();

        const options = {
            amount: Number(appointment.fees) * 100,
            currency: process.env.currency,
            receipt: appointmentId
        };

        const order = await instance.orders.create(options);

        return res.json({success: true, order});
    }
    catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

export const verifyPayment = async (req,res) => {
    try {
        const {razorpay_order_id} = req.body;
        if(!razorpay_order_id){
            return res.json({success:false, message:'please provide an id'});
        }
        const razorpayInstance = configRazorPay();
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
        if(orderInfo.status === 'paid'){
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt,{payment:true});
            return res.json({success: true, message:'payment successfull'});
        }
        else{
            return res.json({success: false, message:'payment failed'});
        }
    } 
    catch (error) {
        return res.json({success:false, message:error.message});
    }
}
