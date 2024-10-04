import React from 'react'
import { useSelector,useDispatch } from 'react-redux';
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import {removeUser} from '../features/userSlice';
import { BASE_URL } from '../utils/constant';
const Navbar=()=>{
  const user = useSelector((store)=>store.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async ()=>{
    try{
    await axios.post(BASE_URL+"/logout",{},{withCredentials:true});
    dispatch(removeUser())
    navigate("/login")}
    catch(err){
      console.errror(err)
    }
  }
   return(
   
<div className="navbar bg-base-300">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">DevConnect</Link>
  </div>
  <div className="flex-none gap-2">
    {user&&(<h3>Welcome, {user.firstName}</h3>)}
    <div className="dropdown dropdown-end mx-7">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          {user&&<img
            alt="Tailwind CSS Navbar component"
            src={user.photoUrl}/>}
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <Link to ="/profile" className="justify-between">
            Profile
            {/* <span className="badge">New</span> */}
          </Link>
        </li>
        <li><a>Connections</a></li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
  </div>
</div>)
}

export default Navbar;