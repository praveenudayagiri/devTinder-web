import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, updateRequests } from '../utils/requestSlice';
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
      dispatch(updateRequests(requestId));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRequestsData();
  }, []);

  return (
    <div className="flex flex-col items-center p-6">
      {requestsData && requestsData.length > 0 ? (
        requestsData.map((req) => {
          const {
            firstName = '',
            lastName = '',
            age = '',
            gender = '',
            about = '',
            skills = [],
            photoUrl = '',
          } = req.user;

          return (
            <div
              key={req.requestId}
              className="card card-side bg-base-300 shadow-sm hover:shadow-md transition-all duration-200 w-full max-w-7/12 my-5"
            >
              {/* Left side image */}
              <figure className="w-32">
                <img
                  src={photoUrl}
                  alt={`${firstName} ${lastName}`}
                  className="w-full h-full object-cover rounded-l-xl min-w-32"
                />
              </figure>

              {/* Right side details */}
              <div className="card-body p-4">
                <h2 className="card-title text-lg capitalize">
                  {firstName} {lastName}
                </h2>
                <p className="text-sm text-gray-500">
                  {age && `${age} yrs • `}{gender}
                </p>
                <p className="mt-2 text-gray-50 italic">{about}</p>

                {/* Skills as chips */}
                {skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="badge badge-outline badge-sm px-2 py-1"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {/* Action buttons */}
                <div className="card-actions justify-end mt-3">
                  <button
                    className="btn btn-sm btn-success rounded-full"
                    onClick={() => handleRequest('accepted', req.requestId)}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-sm btn-error rounded-full"
                    onClick={() => handleRequest('rejected', req.requestId)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-center text-lg text-gray-500 mt-10 mb-90">
          No new requests found.
        </p>
      )}
    </div>
  );
};

export default Requests;
