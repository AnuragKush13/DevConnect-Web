import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import {addConnection} from '../features/connectionSlice';
const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector(store=>store.connection);
    const getConnections = async ()=>{
        try{
            const res = await axios.get(BASE_URL+"/user/connections",{withCredentials:true});
           dispatch(addConnection(res.data.data))
        }
        catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        getConnections();
    },[])
    if(!connections)return;
  if(connections.length <= 0)return (<h2 className='flex justify-center my-10 text-xl'>No Connection yet..</h2>)

  
  return (<div className='flex-col '>
    <div className='text-center my-5 text-2xl'>Connections</div>
    {connections&&connections.map((connection)=>{
        const {_id,firstName,lastName,age,photoUrl,gender,about} = connection;
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
                
            
            </div>
          </div>)
    })}
</div>
  )
}

export default Connections