import express from "express";
import {doctorlist,doctorLogin,appointmentsByDoctor,
    cancelAppointment, completeAppointment,doctorDashBoard,
    doctorProfile,updateDocProfile
} from "../controllers/doctorControllers.js"
import authDoctor from "../middlewares/authDoctor.js"
const router = express.Router();

router.get('/doctor-list',doctorlist);
router.post('/login',doctorLogin);
router.get('/appointments',authDoctor,appointmentsByDoctor);
router.post('/cancel-appointment', authDoctor, cancelAppointment);
router.post('/complete-appointment', authDoctor, completeAppointment);
router.get('/dashboard',authDoctor,doctorDashBoard);
router.get('/profile',authDoctor,doctorProfile);
router.post('/update-profile',authDoctor,updateDocProfile);


export default router