import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants,js";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  console.log(feed);

  const getFeed = async () => {
    if (feed) return;

    try {
      const feedRes = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(feedRes?.data?.data));
    } catch (err) {
      throw new Error(err.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return;

  if (feed.length <= 0) {
    return (
      <h1 className="text-center m-10">
        No more connection suggestions available. Please visit later.
      </h1>
    )};

  return (
    feed && (
      <div className="flex place-content-center my-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
