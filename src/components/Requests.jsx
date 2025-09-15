import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, updateRequests } from "../utils/requestSlice";
import axios from "axios";

const Requests = () => {
  const requestsData = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const [showNotification, setShowNotification] = useState(false);

  const getRequestsData = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data?.formattedData ?? []));
    } catch (err) {
      console.error(err);
    }
  };

  const handleRequest = async (status, requestId) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + requestId,
        {},
        { withCredentials: true }
      );
      dispatch(updateRequests(requestId));
      if (status === "accepted") {
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 2000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getRequestsData();
  }, []);

  return (
    <div className="flex flex-col items-center p-6 mb-55">
      {showNotification && (
        <div className="toast toast-top toast-center fixed z-50">
          <div className="alert alert-success">
            <span>Request Accepted!</span>
          </div>
        </div>
      )}
      <p className="text-2xl flex justify-center my-5">Requests</p>
      {requestsData && requestsData.length > 0 ? (
        requestsData.map((req) => {
          const user = req?.user ?? {};
          const {
            firstName = "",
            lastName = "",
            age = "",
            gender = "",
            about = "",
            skills = [],
            photoUrl = "https://via.placeholder.com/150",
          } = user;

          return (
            <div
              key={req?.requestId ?? Math.random()}
              className="card card-side bg-base-300 shadow-sm hover:shadow-md transition-all duration-200 w-full max-w-7/12 my-5"
            >
              <figure className="w-32">
                <img
                  src={photoUrl}
                  alt={(firstName || "User") + " " + (lastName || "")}
                  className="w-full h-full object-cover rounded-l-xl min-w-32"
                />
              </figure>

              <div className="card-body p-4">
                <h2 className="card-title text-lg capitalize">
                  {firstName} {lastName}
                </h2>
                <p className="text-sm text-gray-500">
                  {age && `${age} yrs • `} {gender}
                </p>
                {about && <p className="mt-2 text-gray-50 italic">{about}</p>}

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

                <div className="card-actions justify-end mt-3">
                  <button
                    className="btn btn-sm btn-success rounded-full"
                    onClick={() => handleRequest("accepted", req?.requestId)}
                    disabled={!req?.requestId}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-sm btn-error rounded-full"
                    onClick={() => handleRequest("rejected", req?.requestId)}
                    disabled={!req?.requestId}
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
