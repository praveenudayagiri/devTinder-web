import React from 'react';

const ConnectionCard = ({ connectionDetails = {} }) => {
  const {
    firstName = "",
    lastName = "",
    age = "",
    gender = "",
    about = "",
    skills = [],
    photoUrl = ""
  } = connectionDetails;

  return (
    <div className="card card-side bg-base-300 shadow-sm hover:shadow-md transition-all duration-200 w-full max-w-7/12 my-5">
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
          <button className="btn btn-sm btn-primary rounded-full">Message</button>
        </div>
      </div>
    </div>
  );
};

export default ConnectionCard;
