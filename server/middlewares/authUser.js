import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
const authUser = async (req,res,next) => {
    try {
        const{usertoken} = req.headers;
        if(!usertoken){
            return res.json({success: false, message: "please login"})
        }
        const deCodeUser = await jwt.verify(usertoken, process.env.JWT_SECRET);
        if(!deCodeUser){
            return res.json({success: false, message: "invalid user"})
        };
        req.body = {
            ...req.body,
            userId: deCodeUser.id
        }
        next();
    } 
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export default authUser;