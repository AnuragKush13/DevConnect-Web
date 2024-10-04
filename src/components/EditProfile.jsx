import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../features/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constant';
import UserCard from './UserCard';

const EditProfile = ({userData}) => {
    
    const [firstName,setFirstName] = useState(userData.firstName);
    const [lastName,setLastName] = useState(userData.lastName);
    const [about,setAbout] = useState(userData.about);
    const [gender,setGender] = useState(userData.gender);
    const [age,setAge] = useState(userData.age);
    const [photoUrl,setPhotoUrl] = useState(userData.photoUrl);
    const [error,setError] = useState("");
    const [showToast,setShowToast] = useState(false);
    const dispatch = useDispatch();
    const handleProfileEdit = async()=>{
      try{
        
        const res = await axios.patch(BASE_URL+"/profile/edit",{firstName,lastName,about,age,gender,photoUrl},{withCredentials:true})
        dispatch(addUser(res.data.data))
        setShowToast(true);
        setTimeout(()=>{
            setShowToast(false);
        },2000)
        // console.log("edit error ::"+res.data)
      }
      catch(err){
        console.error("edit error ::"+err)
        setError(err?.response?.data || "Something went wrong!!")
      }
    }
  
  
    return (
      <div className='flex justify-center my-4 gap-10'>

      {userData && <div className='flex justify-center '>
        {showToast&&<div className="toast toast-top toast-center">
        <div className="alert alert-success">
            <span>Profile Updated Succesfully!!</span>
        </div>
        </div>}
        <div className="card bg-base-300 w-96 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Edit Profile.</h2>
       
  <label className="input input-bordered flex items-center gap-2 my-1">
    
    <input type="text" className="grow" placeholder="First Name" value = {firstName} onChange={(e)=>setFirstName(e.target.value)}/>
   
  </label>
  <label className="input input-bordered flex items-center gap-2 my-1">
    
    <input type="text" className="grow" placeholder="Last Name" value = {lastName} onChange={(e)=>setLastName(e.target.value)}/>
   
  </label>
  <label className="input input-bordered flex items-center gap-2 my-1">
    
    <input type="text" className="grow" placeholder="Age" value = {age} onChange={(e)=>setAge(e.target.value)}/>
   
  </label>
  <label className="input input-bordered flex items-center gap-2 my-1">
    
    <input type="text" className="grow" placeholder="Photo URL" value = {photoUrl} onChange={(e)=>setPhotoUrl(e.target.value)}/>
   
  </label>
  <label className="input input-bordered flex items-center gap-2 my-1">
    
    <input type="text" className="grow" placeholder="Gender" value = {gender} onChange={(e)=>setGender(e.target.value)}/>
   
  </label>
  
  <textarea className="textarea textarea-bordered gap-2 my-1" placeholder="Bio" value = {about} onChange={(e)=>setAbout(e.target.value)}></textarea>
  
  
    <p className='text-red-500'>{error}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={handleProfileEdit}>Save Profile</button>
        </div>
      </div>
    </div></div>}
    <UserCard user = {{firstName,lastName,gender,photoUrl,age,about}}/>
    </div>
    )
  }
  

export default EditProfile