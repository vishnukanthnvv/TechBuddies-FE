import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants,js';
import { addConnection } from '../utils/connectionsSlice';


const Connections = () => {
    const connections = useSelector(store => store.connections);
    const dispatch = useDispatch();
    
    const getConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
            console.log(res?.data?.data);
            dispatch(addConnection(res?.data?.data));
        } catch(err){
            console.log(err.message);
        }
    }
    
    useEffect(() => {
        getConnections();
    }, []);
    
    console.log(connections);
    if(!connections) return;

    if(connections.length === 0) return <h1>No connections found</h1>

    return (
        connections && (<div className='text-center my-10'>
            <div className='text-bold text-white text-2xl'>Connections</div>
            <div>
                {connections.map((connection) => {
                    const {_id, firstName, lastName, photoUrl, age, gender, about } = connection;
                    return (

                        <div key={_id} className='flex items-center m-4 p-4 bg-base-300 w-1/3 mx-auto'>
                            <img
                                alt='user Photo'
                                className='w-20 h-20 rounded-full' 
                                src={photoUrl}
                            />
                            <div className='text-left mx-4'>
                                <h2 className='font-bold text-xl'>{firstName + " " + lastName}</h2>
                                {age && <h2>{age}</h2>}
                                {gender && <h2>{gender}</h2>}
                                <p>{about}</p>
                            </div>
                        </div>       
                    );
                })}
            </div>
        </div>)
    )
}

export default Connections