import React, { useEffect } from 'react'
import UserCard from './UserCard';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constant';
import axios from 'axios';
import { addFeed } from '../features/feedSlice';
import { useNavigate } from 'react-router-dom';
const Feed = () => {
   const feedData = useSelector((state)=>state.feed);
    const dispatch = useDispatch();
    const navigate = useNavigate();
   const feed = async ()=>{
    if(feedData)return;
    try{
        const res = await axios.get(BASE_URL+"/feed",{withCredentials:true});

        dispatch(addFeed(res.data))
    }
    catch(err){
        if(err.status){
            navigate("/login")
        }
    }
   }

   useEffect(()=>{
    feed();
   },[])

   if(!feedData)return;

   if(feedData.length <=0)return <h1 className='flex justify-center my-5'>No Users Available..</h1>

  return (
    <div className='flex justify-center my-5'>
       
        {feedData&&<UserCard user = {feedData[0]}/>}
    </div>
  )
}

export default Feed