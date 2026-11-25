import express from "express"
import {
    userRegistration, userLogin, getProfile,
    updateProfile, bookAppointment, bookedAppointments, 
    cancelAppointment,fessPayment,verifyPayment
} from "../controllers/userControllers.js"

import authUser from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";


const router = express.Router();

router.post('/register',userRegistration);
router.post('/login',userLogin);
router.get('/get-profile',authUser,getProfile);
router.post('/update-profile', upload.single('image'),authUser, updateProfile);
router.post('/book-appointment',authUser,bookAppointment);
router.get('/appointment-records',authUser,bookedAppointments);
router.post('/cancel-appointment', authUser, cancelAppointment);
router.post('/fees-payment',authUser,fessPayment);
router.post('/verify-payment',authUser,verifyPayment);

export default router;