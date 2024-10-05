import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../features/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constant';

const Login = () => {
  const [emailId,setEmailId] = useState("");
  const [password,setPassword] = useState("");
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [error,setError] = useState("");
  const [isLogin,setIsLogin]= useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async()=>{
    try{
      
      const res = await axios.post(BASE_URL+"/login",{emailId,password},{withCredentials:true})
      dispatch(addUser(res.data.user))
      navigate("/")
    }
    catch(err){
      setError(err?.response?.data || "Something went wrong!!")
    }
  }

  const handleSignup = async()=>{
    try{
      const res = await axios.post(BASE_URL+"/signup",{firstName,lastName,emailId,password},{withCredentials:true})
      console.log(res);
      handleLogin();
    }
    catch(err){setError(err?.response?.data || "Something went wrong!!")}
  }
  return (
    <div className='flex justify-center my-4'>
      <div className="card bg-base-300 w-96 shadow-xl">
    <div className="card-body">
      <h2 className="card-title">{isLogin?"Login.":"Create a DevConnect account."}</h2>
     
{!isLogin&&<>

  <label className="input input-bordered flex items-center gap-2 my-1">
  
  <input type="text" className="grow" placeholder="First Name" value = {firstName} onChange={(e)=>setFirstName(e.target.value)}/>
 
</label>
<label className="input input-bordered flex items-center gap-2 ">
  
  <input type="text" className="grow" placeholder="Last Name" value={lastName} onChange={(e)=>setLastName(e.target.value)} />
</label> </>}   
<label className="input input-bordered flex items-center gap-2 my-1">
  
  <input type="text" className="grow" placeholder="Email" value = {emailId} onChange={(e)=>setEmailId(e.target.value)}/>
 
</label>
<label className="input input-bordered flex items-center gap-2 ">
  
  <input type="text" className="grow" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
</label>
<p className='text-red-500'>{error}</p>
      <div className="card-actions justify-end">
     
        <button className="btn btn-primary" onClick={isLogin?handleLogin:handleSignup}>{isLogin?"Login":"Signup"}</button>
        
      </div>
      <h3 className='text-secondary-500 m-auto cursor-pointer' onClick={()=>{setIsLogin(!isLogin)}}>
        {isLogin?" Create a new account here.":"Existing user, Login here."}</h3>
    </div>
  </div></div>
  )
}

export default Login