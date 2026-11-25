import jwt from "jsonwebtoken";

export const authAdmin = async (req, res, next) => {
    try {
        const {admintoken} = req.headers;
        if(!admintoken){
            return res.json({success:false, message: "please login first"});
        }
        const decode_token = jwt.verify(admintoken, process.env.JWT_SECRET);
        if(!decode_token){
            return res.json({success:false, message: "token is invalid or unverified"});
        }
        if(decode_token === process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            next();
        }
        else{
            return res.json({success:false, message: "token is invalid"});
        }
    } 
    catch (error) {
        return res.json({success:false, message: error.message});
    }
}
