import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants,js";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      console.log(res?.data?.data);
      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  const reviewRequest = async (status, id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + `/${id}`,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequest(id));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0) return <h2 className="flex justify-center m-10">No Connection requests found</h2>;

  return (
    requests && (
      <div className="text-center my-10">
        <div className="text-bold text-white text-2xl">Requests</div>
        <div>
          {requests.map((request) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } =
              request.fromUserId;
            return (
              <div
                key={_id}
                className="flex items-center justify-between m-4 p-4 bg-base-300 w-1/3 mx-auto"
              >
                <div className="flex flex-row items-center">
                  <img
                    alt="user Photo"
                    className="w-20 h-20 rounded-full mx-4"
                    src={photoUrl}
                  />
                  <div className="text-left mx-4">
                    <h2 className="font-bold text-xl">
                      {firstName + " " + lastName}
                    </h2>
                    {age && <h2>{age}</h2>}
                    {gender && <h2>{gender}</h2>}
                    <p>{about}</p>
                  </div>
                </div>
                <div className="flex flex-col mx-4">
                  <button
                    className="btn btn-primary my-2 px-4"
                    onClick={() => reviewRequest("accepted", request._id)}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-secondary my-2 px-4"
                    onClick={() => reviewRequest("rejected", request._id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
};

export default Requests;
