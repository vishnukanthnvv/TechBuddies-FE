import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants,js';
import { addRequests } from '../utils/requestSlice';

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector(store => store.requests);

    const fetchRequests = async () => {
        try{
            const res = await axios.get(BASE_URL + "/user/requests/received", { withCredentials : true });
            console.log(res?.data?.data);
            dispatch(addRequests(res?.data?.data));
        } catch(err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        fetchRequests();
    }, []);

    if(!requests) return;

    if(requests.length === 0) <h2>No requests founds</h2>

  return (
        requests && (<div className='text-center my-10'>
            <div className='text-bold text-white text-2xl'>Requests</div>
            <div>
                {requests.map((request) => {
                    const {_id, firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;
                    return (

                        <div key={_id} className='flex items-center m-4 p-4 bg-base-300 w-1/2 mx-auto'>
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

export default Requests