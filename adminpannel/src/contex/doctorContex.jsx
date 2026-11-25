import { createContext, use, useState } from "react";
import {toast} from "react-toastify";
import axios from "axios";

export const DoctorContex = createContext();

export const DoctorContexProvider = (props) => {
    const [doctorToken, setDoctorToken] = useState(localStorage.getItem('doctortoken') ? localStorage.getItem('doctortoken') : '');
    const[doctorAppointments, setDoctorAppointments] = useState([]);
    const backendurl = 'https://doctime-server-20qa.onrender.com'
    const getAppointmentByDoctor = async () => {
        try {
            const response = await axios.get(backendurl + '/api/doctor/appointments',{
                headers:{
                    doctortoken: doctorToken,
                }
            });
            if(response.data.success){
               setDoctorAppointments(response.data.appointments.reverse());
            }
        } 
        catch (error) {
            toast.error(error.message);
        }
    }
    const value = {backendurl,doctorToken,setDoctorToken,doctorAppointments,getAppointmentByDoctor};
    return (
        <DoctorContex.Provider value={value}>
        {props.children}
        </DoctorContex.Provider>
    )
}
