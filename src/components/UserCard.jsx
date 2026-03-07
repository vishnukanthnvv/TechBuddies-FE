import React from "react";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { BASE_URL } from "../utils/constants,js";
import axios from "axios";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleSuggestedConnection = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send" + `/${status}/${userId}`,
        {},
        { withCredentials: true },
      );

      dispatch(removeUserFromFeed(_id));
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img className="mt-4" src={photoUrl} alt="User Photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{about}</p>
        {age && <p>{age + "Yrs"}</p>}
        {gender && <p>{gender}</p>}
        <div className="card-actions justify-center">
          <button
            className="btn btn-secondary mr-5"
            onClick={() => handleSuggestedConnection("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handleSuggestedConnection("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
