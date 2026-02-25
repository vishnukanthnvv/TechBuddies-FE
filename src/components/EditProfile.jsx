import React, { useState } from 'react'
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants,js';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({ user }) => {
    
    const [error, setError] = useState("");
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [age, setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender);
    const [about, setAbout] = useState(user.about);
    const [showToast, setShowToast] = useState(false);
    const [toastMsg, setToastMsg] = useState("");
    
    const dispatch = useDispatch();
    const saveProfile = async () => {
        try {
            const res = await axios.patch(
                BASE_URL + "profile/edit", 
                {
                    firstName,
                    lastName,
                    photoUrl,
                    age,
                    gender,
                    about
                },
                { withCredentials: true, }
            );

            dispatch(addUser(res?.data?.data));
            setToastMsg(res?.data?.message);
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);

        } catch(err){
            setError(err.response.data);
            console.log(error);
        }
    }
  return (
    <div className='flex justify-center my-10'>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mr-10">
            <legend className="fieldset-legend">Profile details</legend>

            <label className="label">First Name</label>
            <input type="text" className="input" value={firstName} onChange={e => { setFirstName(e.target.value)}} />

            <label className="label">Last Name</label>
            <input type="text" className="input" value={lastName} onChange={e => { setLastName(e.target.value)}} />

            <label className="label">Photo Url</label>
            <input type="text" className="input" value={photoUrl} onChange={e => { setPhotoUrl(e.target.value)}} />

            <label className="label">Age</label>
            <input type="text" className="input" value={age} onChange={e => { setAge(e.target.value)}} />

            <label className="label">Gender</label>
            <input type="text" className="input" value={gender} onChange={e => { setGender(e.target.value)}} />

            <label className="label">About</label>
            <textarea className="textarea h-24" value={about} onChange={e => { setAbout(e.target.value)}}></textarea>
            
            <button className="btn btn-primary my-3" onClick={saveProfile}>Save Profile</button>
        </fieldset>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 ml-10">
            <legend className="fieldset-legend">Preview Profile Card</legend>
            <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
        </fieldset>
        {showToast && (<div className="toast toast-top toast-center">
            <div className="alert alert-success">
                <span>{toastMsg}</span>
            </div>
        </div>)}
    </div>

  )
}

export default EditProfile