import React from 'react'

const UserCard = ({ userDetails }) => {
  const { firstName, lastName, age, gender, about, photoUrl, skills } = userDetails;

  return (
    <div>
      <div className="card bg-base-300 w-96 shadow-lg rounded-lg overflow-hidden">
        <figure>
          <img
            src={photoUrl}
            alt={`${firstName} ${lastName}`}
            className="h-64 w-full object-cover"
          />
        </figure>
        <div className="card-body">
         
          <h2 className="card-title text-xl font-bold">
            {firstName + " " + lastName}
          </h2>

          <p className="text-sm text-gray-50">
            Age: {age} | Gender: {gender}
          </p>

          {about && (
            <p className="mt-2 text-gray-50 italic">
              {about}
            </p>
          )}

          {skills && skills.length > 0 && (
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

          
          <div className="card-actions justify-center mt-4 gap-4">
            <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-md hover:scale-105 transition-transform duration-200">
              Interested
            </button>
            <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 hover:scale-105 transition-all duration-200">
              Ignore
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserCard;
