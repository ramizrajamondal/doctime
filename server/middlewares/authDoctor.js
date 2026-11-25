import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";

const authDoctor = async (req, res, next) => {
    try {
        const {doctortoken} = req.headers;
        if(!doctortoken){
            return res.json({success:false, message:'token not found'});
        }

        const decodeToken = await jwt.verify(doctortoken,process.env.JWT_SECRET);
        if(!decodeToken){
            return res.json({success:false, message:'invalid doctor'});
        }
        req.body = {
            ...req.body,
            doctorId: decodeToken.id
        }
        next();
    } 
    catch (error) {
        return res.json({message: error.message});
    }
}

export default authDoctor