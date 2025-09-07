import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';
import axios from 'axios';
import ConnectionCard from './ConnectionCard';

const Connections = () => {
    const connectionsData = useSelector((store)=> store.connections);
    const dispatch = useDispatch();
    const getConnectionData =async()=>{
        const res = await axios.post(BASE_URL+"/user/connections",{},{
        withCredentials:true
    });
    dispatch(addConnections(res.data.data))
    }
    useEffect(()=>{
        getConnectionData();
    },[])
  return (
    <div>
        <div className='flex justify-center'>
            <h1 className='text-2xl'>Connections</h1>
        </div>
        <div className='justify-items-center'>
            {connectionsData && connectionsData.length > 0 ? (
                connectionsData.map((card) => (
                <ConnectionCard key={card._id} connectionDetails={card} />
                ))
                ) : (
                    <p className="text-center text-gray-500 mt-4">No connections found.</p>
                )}
        </div>

    </div>
  )
}

export default Connections;