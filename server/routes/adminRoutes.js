import express from "express";
import { addDoctor, adminLogin, 
    getAllDoctor, changeAvaliablity,getAllAppointments,
    cancelAppointment,getDashBoardData
    
} from "../controllers/adminControllers.js";
import upload from "../middlewares/multer.js";
import {authAdmin} from "../middlewares/authAdmin.js";

const router = express.Router();

router.post('/add-doctor',authAdmin,upload.single('image'),addDoctor);
router.post('/login',adminLogin);
router.get('/all-doctors',authAdmin,getAllDoctor);
router.post('/change-availablity',authAdmin,changeAvaliablity);
router.get('/get-appointments',authAdmin,getAllAppointments);
router.post('/cancel-appointment',authAdmin,cancelAppointment);
router.get('/get-dashboard',authAdmin,getDashBoardData);

export default router;