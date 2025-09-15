import React from "react";
import { Link } from "react-router-dom";

const ConnectionCard = ({ connectionDetails = {} }) => {
  const {
    _id = "",
    firstName = "",
    lastName = "",
    age = "",
    gender = "",
    about = "",
    skills,
    photoUrl = "https://via.placeholder.com/150",
  } = connectionDetails;

  const safeSkills = Array.isArray(skills) ? skills : [];

  return (
    <div className="card card-side bg-base-300 shadow-sm hover:shadow-md transition-all duration-200 w-full max-w-7/12 my-5">
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

        {safeSkills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {safeSkills.map((skill, idx) => (
              <span key={idx} className="badge badge-outline badge-sm px-2 py-1">
                {skill}
              </span>
            ))}
          </div>
        )}

        <div className="card-actions justify-end mt-3">
          <Link to={_id ? "/chat/" + _id : "#"}>
            <button
              className="btn btn-sm btn-primary rounded-full"
              disabled={!_id}
            >
              Message
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConnectionCard;
