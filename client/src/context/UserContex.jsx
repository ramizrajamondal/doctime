import { createContext, useEffect, useState } from "react"
import { toast } from "react-toastify";
import axios from "axios";

export const UserContex = createContext();

export const UserContextProvider =  (props) => {
    const[userToken, setUserToken] = useState(localStorage.getItem('userToken') ? localStorage.getItem('userToken') : '');
    const[userProfile, setUserProfile] = useState({});
    const backendurl = 'https://doctime-server-20qa.onrender.com'
    const getProfile = async () => {
      try {
        const response = await axios.get(`${backendurl}/api/users/get-profile`, {
          headers:{
            usertoken: userToken,
          }
        });
        if(response.data.success){
          setUserProfile(response.data.profile);
        }
        else{
          toast.error(response.data.message);
        }
      } 
      catch (error) {
        toast.error(error.response?.data?.message || error.message);
      }
    }
    useEffect(() => {
    if(userToken){
      getProfile();
    }
    else{
      setUserProfile('');
    }
    },[userToken])
   const value = {userToken, setUserToken, userProfile, setUserProfile, getProfile, backendurl}
   return (
    <UserContex.Provider value={value}>
      {props.children}
    </UserContex.Provider>
   )
}
