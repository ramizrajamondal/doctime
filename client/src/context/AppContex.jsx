import { createContext } from "react";
import { doctors } from "../assets/assets"
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"
import { useEffect } from "react";

export const AppContext = createContext([]);

export const AppContextProvider = (props) => {
  const [doctors, setDoctors] = useState([]);
  const backendurl = import.meta.env.VITE_BACKEND_URL
  const currIcon = '$'
  const getAllDoctors = async () => {
    try {
      const response = await axios.get(backendurl + '/api/doctor/doctor-list');
      if (response.data.success) {
        setDoctors(response.data.allDoctors);
      }
      else{
        toast.error(response.data.message);
      }
    }
    catch (error) {
      toast.error(response.data?.error.message || error.message);
    }
  }
  useEffect(() => {
   getAllDoctors();
  },[])

  const value = { doctors, currIcon, backendurl };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}