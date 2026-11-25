import { createContext, useState } from "react";
import {toast} from "react-toastify"
import axios from "axios"

export const AdminContex = createContext();

export const AdminContexProvider = (props) => {
    const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken') ? localStorage.getItem('adminToken') : '');
    const backendurl = 'https://doctime-server-20qa.onrender.com'
    const value = {adminToken,setAdminToken,backendurl}
    return (
        <AdminContex.Provider value={value}>
            {props.children}
        </AdminContex.Provider>
    )
}
