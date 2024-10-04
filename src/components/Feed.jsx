import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constant'
import { useDispatch } from 'react-redux'
import { addUser } from '../features/userSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Feed = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fetchUser = async()=>{
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
        fetchUser();
    })
  return (
    <div>Feed</div>
  )
}

export default Feed