import { createContext, useState } from "react";
import {toast} from "react-toastify"
import axios from "axios"

export const AdminContex = createContext();

export const AdminContexProvider = (props) => {
    const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken') ? localStorage.getItem('adminToken') : '');
    const backendurl = import.meta.env.VITE_BACKEND_URL
    const value = {adminToken,setAdminToken,backendurl}
    return (
        <AdminContex.Provider value={value}>
            {props.children}
        </AdminContex.Provider>
    )
}