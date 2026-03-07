import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants,js";


const Login = () => {
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [about, setAbout] = useState("");
    const [isLoginForm, setIsLoginForm] = useState(false);
    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
      try {
        const res = await axios.post(
          BASE_URL + "/login",
          {
            emailId,
            password,
          },
          {
            withCredentials: true,
          },
        );

        dispatch(addUser(res?.data?.data));
        return navigate("/feed");
      } catch (err) {
        setError(err?.response?.data);
        console.log(err.response.data);
      }
    };

    const handleSignup = async () => {
        try{
            const newUser = await axios.post(BASE_URL + "/signup", {
                firstName,
                lastName,
                age,
                gender,
                emailId,
                password,
                about
            }, { withCredentials: true });

            dispatch(addUser(newUser?.data?.data));
            return navigate("/profile");
        } catch(err) {
            setError(err?.response?.data);
        }
    }

    return (
        <div className="flex justify-center my-5">
        <div className="card w-96 bg-base-300 card-xl shadow-sm">
            <div className="card-body flex justify-center">
            <h2 className="card-title justify-center">{isLoginForm ? "Login" : "Signup"}</h2>
            {!isLoginForm && (
                <>
                    <div className="first-name my-2">
                        <label className="label text-sm mb-2">First Name</label>
                        <input type="text" className="input" value={firstName} placeholder="Enter First Name" onChange={e => { setFirstName(e.target.value)}} required/>                        <div className="justify-end card-actions"></div>
                    </div>
                    <div className="last-name mb-2">
                    <label className="label text-sm mb-2">Last Name</label>
                    <input type="text" className="input" value={lastName} placeholder="Enter Last Name" onChange={e => { setLastName(e.target.value)}} required/>
                        <div className="justify-end card-actions"></div>
                    </div>
                    <div className="age mb-2">
                    <label className="label text-sm mb-2">Age</label>
                        <input type="text" className="input" value={age} placeholder="Enter Age" onChange={e => { setAge(e.target.value)}} />
                        <div className="justify-end card-actions"></div>
                    </div>
                    <div className="gender mb-2">
                    <label className="label text-sm mb-2">Gender</label>
                        <select className="select select-md" value={gender} onChange={e => { setGender(e.target.value) }}>
                            <option></option>
                            <option>male</option>
                            <option>female</option>
                            <option>others</option>
                        </select>   
                    </div>
                    <div className="about mb-2">
                        <label className="label text-sm mb-2">About</label>
                        <textarea className="textarea h-24" value={about} placeholder="Breif description about yourself" onChange={e => { setAbout(e.target.value)}}></textarea>
                        <div className="justify-end card-actions"></div>
                    </div>
                    <p className="text-red-500">{error}</p>
                </>
            )}
            <div className="email mb-2">
                <label className="label text-sm mb-2">Email</label>
                <label className="input validator">
                <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                    <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                    >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </g>
                </svg>
                <input type="email" value={emailId} onChange={(e) => setEmailId(e.target.value)} placeholder="mail@site.com" required />
                </label>
                <div className="validator-hint hidden">
                Enter valid email address
                </div>
                <div className="justify-end card-actions"></div>
            </div>
            <div className="password mb-2">
                <label className="label text-sm mb-2">Password</label>
                <label className="input validator">
                <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                    <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                    >
                    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                    <circle
                        cx="16.5"
                        cy="7.5"
                        r=".5"
                        fill="currentColor"
                    ></circle>
                    </g>
                </svg>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Password"
                    minLength="8"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                />
                </label>
                <p className="validator-hint hidden">
                Must be more than 8 characters, including <br />
                At least one number <br />
                At least one lowercase letter <br />
                At least one uppercase letter
                </p>
            {error && <div className="error text-red-600 pt-3">{error}</div>}
            </div>
            <button className="btn btn-primary my-3" onClick={() => isLoginForm ? handleLogin() : handleSignup()}>{isLoginForm ? "Login" : "Signup"}</button>
            <div className="label justify-center">
                <Link onClick={() => setIsLoginForm(value => !value)}>{isLoginForm ? "New User? Signup Here" : "Already have account? Login Here"}</Link></div>
            </div>
        </div>
        </div>
    );
};

export default Login;
