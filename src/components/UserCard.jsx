import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests } from '../utils/requestSlice';
import axios from 'axios';

const Requests = () => {
  const requestsData = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const getRequestsData = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/requests/received', {
        withCredentials: true,
      });
      console.log(res.data.formattedData);
      dispatch(addRequests(res.data.formattedData));
    } catch (err) {
      console.log(err);
    }
  };

  const handleRequest = async (status, requestId) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );
      console.log(res.data);

      // remove handled request from Redux state
      const updated = requestsData.filter((req) => req.requestId !== requestId);
      dispatch(addRequests(updated));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRequestsData();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">
      {requestsData && requestsData.length > 0 ? (
        requestsData.map((req) => {
          const {
            firstName,
            lastName,
            age,
            gender,
            about,
            photoUrl,
            skills = [],
          } = req.user;

          return (
            <div
              key={req.requestId}
              className="card bg-base-300 w-96 shadow-lg rounded-lg overflow-hidden"
            >
              {/* Top image */}
              <figure>
                <img
                  src={photoUrl}
                  alt={`${firstName} ${lastName}`}
                  className="h-64 w-full object-cover"
                />
              </figure>

              {/* Card body */}
              <div className="card-body">
                <h2 className="card-title text-xl font-bold">
                  {firstName} {lastName}
                </h2>

                <p className="text-sm text-gray-50">
                  Age: {age} | Gender: {gender}
                </p>

                {about && (
                  <p className="mt-2 text-gray-50 italic">{about}</p>
                )}

                {skills.length > 0 && (
                  <div className="mt-3">
                    <p className="font-semibold">Skills:</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {skills.map((skill, idx) => (
                        <div key={idx} className="badge badge-outline">
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action buttons */}
                <div className="card-actions justify-center mt-4 gap-4">
                  <button
                    onClick={() =>
                      handleRequest('accepted', req.requestId)
                    }
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-md hover:scale-105 transition-transform duration-200"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() =>
                      handleRequest('rejected', req.requestId)
                    }
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 hover:scale-105 transition-all duration-200"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-center text-lg text-gray-500 mt-10">
          No new requests found.
        </p>
      )}
    </div>
  );
};

export default Requests;
