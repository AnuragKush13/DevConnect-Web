import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../features/feedSlice';

const UserCard = ({user}) => {
    const {_id,firstName,lastName,about,photoUrl,age,gender} = user;
    const dispatch= useDispatch();
    const handleSendRequest = async(status,userId)=>{
      try{
        const res = await axios.post(BASE_URL+"/request/send/"+status+"/"+userId,{},{withCredentials:true});
        dispatch(removeUserFromFeed(userId));

      }
      catch(err){console.log(err)}
    }
    // console.log(user);
  return (
    <div className="card bg-base-300 w-96 shadow-xl">
  <figure className="px-10 pt-10">
    <img
      src={photoUrl||"https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
      alt="Shoes"
      className="rounded-xl max-h-52 min-h-52" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">{firstName+" "+lastName}</h2>
    {age&&gender&&<p>{age +", "+ gender}</p> }
    <p>{about}</p> 
    <div className="card-actions">
      <button className="btn btn-primary" onClick={()=>handleSendRequest("ignored",_id)}>Ignore</button>
      <button className="btn btn-secondary" onClick={()=>handleSendRequest("interested",_id)}>Interested</button>
    </div>
  </div>
</div>
  )
}

export default UserCard