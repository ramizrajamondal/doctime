import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRoute from "./routes/adminRoutes.js";
import doctorRoute from "./routes/doctorRoutes.js";
import userRoute from "./routes/userRoute.js"


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

connectDB();
connectCloudinary();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
    "https://doctime-frontend-ebqj.onrender.com",
    "https://doctime-admin-pannel.onrender.com"
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

app.use('/api/admin', adminRoute);
app.use('/api/doctor',doctorRoute);
app.use('/api/users',userRoute);


app.listen(port, () => {
    console.log(`server is running at port ${port}`)
})

export default app;


