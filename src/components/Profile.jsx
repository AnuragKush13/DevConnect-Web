import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../features/userSlice';
import { BASE_URL } from '../utils/constant';
import EditProfile from './EditProfile';

const Profile = () => {
  
  const userData = useSelector((store)=>store.user);
  const [firstName,setFirstName] = useState(userData.firstName);
  const [lastName,setLastName] = useState(userData.lastName);
  const [about,setAbout] = useState(userData.about);
  const [gender,setGender] = useState(userData.gender);
  const [photoUrl,setPhotoUrl] = useState(userData.photoUrl);
  const [error,setError] = useState("");
  const dispatch = useDispatch();
  const handleProfileEdit = async()=>{
    try{
      
      const res = await axios.patch(BASE_URL+"/profile/edit",{firstName,lastName,about,gender,photoUrl},{withCredentials:true})
      dispatch(addUser(res.data.data))
      
    }
    catch(err){
      setError(err?.response?.data || "Something went wrong!!")
    }
  }


  return (
    <>
    {userData && <EditProfile userData= {userData}/>}</>
  )
}

export default Profile