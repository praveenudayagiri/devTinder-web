import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import axios from 'axios';
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const userFeed = useSelector((store) => store.feed);

  const getFeed = async () => {
    if (userFeed) return;
    try {
      const res = await axios.post(
        BASE_URL + "/user/feed",
        {},
        { withCredentials: true }
      );
      dispatch(addFeed(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!userFeed) {
    return <p>Loading feed...</p>; 
  }

  return (
    <>
      { userFeed &&
            <div className="min-h-screen flex flex-col">
            <div className="flex flex-wrap gap-4 justify-center my-8 flex-1">
              <UserCard userDetails={userFeed[0]}/>
            </div>
            </div>

      }
      </>
  );
};

export default Feed;
