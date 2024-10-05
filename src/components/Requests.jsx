import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import {addRequest, removeRequest} from '../features/requestSlice';
import { removeUser } from '../features/userSlice';
const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector(state=>state.requests)
    const fetchRequests = async ()=>{
     try{
      const res = await axios.get(BASE_URL+"/user/requests/received",{withCredentials:true});
      dispatch(addRequest(res.data));
     }
     catch(err){
      console.log(err)
     }
  }

  const reviewRequests = async (status,_id)=>{
    try{
      const res = await axios.post(BASE_URL+"/request/review/"+status+"/"+_id,{},{withCredentials:true})
      dispatch(removeRequest(_id));
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    fetchRequests();
  },[])


  if(!requests)return;

   if(requests.length===0)return (<h2 className='flex justify-center my-10 text-xl'>No Connection Requests..</h2>)


  return (
  <div className='flex-col '>
    
    <div className='text-center my-5 text-xl '>Connection Requests</div>
    {requests&&requests.map((request)=>{
        const {_id,firstName,lastName,age,photoUrl,gender,about}= request.fromUserId;
        return (<div key={_id} className="card card-side bg-base-300 shadow-xl w-8/12 my-5 min-h-32 m-auto ">
            {photoUrl?<figure >
              <img className='w-36 min-h-32 mx-2 my-2 rounded-bl-sm'
                src={photoUrl}
                alt="Movie" />
            </figure>:<figure >
              <img className='w-36 min-h-32 '
                src="https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                alt="Movie" />
            </figure>}
            <div className="card-body  ">
              <h2 className="card-title">{firstName+" "+lastName}</h2>
              {age&&gender&&<p>{age +", "+ gender}</p> }
              <p>{about}</p>
                
              <div className="card-actions">
      <button className="btn btn-primary" onClick={()=>{reviewRequests("rejected",request._id)}}>Reject</button>
      <button className="btn btn-secondary" onClick={()=>{reviewRequests("accepted",request._id)}}>Accept</button>
    </div>
            </div>
          </div>)
    })}
</div>
  )
}

export default Requests