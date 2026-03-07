import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { BASE_URL } from '../utils/constants,js';
import { removeUser } from '../utils/userSlice';

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch(err) {
      throw new Error(err.message);
    }
  }

  return (
    <div className="navbar bg-base-200 shadow-sm">
        <div className="flex-1">
          <Link to="/feed" className="btn btn-ghost text-xl">👨🏿‍🤝‍👨🏿TechBuddies</Link>
        </div>
        <div className="flex gap-2">
          { 
            user && 
            <div className='flex mr-4'>
              <div className='flex flex-col pr-3 justify-center'>Welcome, {user.firstName}</div>
              <div className="dropdown dropdown-end mx-5">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="User Avtar"
                    src={user.photoUrl}
                  />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-2 mt-3 w-52 p-2 shadow"
                >
                <li>
                  <Link to="/feed" className="justify-between">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/connections" className="justify-between">
                    Connections
                  </Link>
                </li>
                <li>
                  <Link to="/requests" className="justify-between">
                    Requests
                  </Link>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
              </div>
            </div>
          }
        </div>
      </div>
  )
}

export default NavBar