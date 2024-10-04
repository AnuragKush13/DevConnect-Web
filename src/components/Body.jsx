import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../features/userSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar' 
import { Outlet } from 'react-router-dom'

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userStoredata = useSelector((store)=>store.user);
  const fetchUser = async()=>{
    console.log("userstoredata::"+userStoredata)
    if(!userStoredata) navigate("/login")
      try{
        
     const res = await axios.get(BASE_URL+"/profile/view",{withCredentials:true})
     dispatch(addUser(res.data));
      }
      catch(err){
          if(err.status === 401)
          navigate("/login")
          console.error(err)
      }
  }
  useEffect(()=>{
    
    if(!userStoredata) return navigate("/login")
      fetchUser();
  },[])
  return (
    <>
    <Navbar/>
    <Outlet/>
    </>
  )
}

export default Body