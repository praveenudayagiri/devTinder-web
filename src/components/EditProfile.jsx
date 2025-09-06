import React, { useState } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addUser } from '../utils/userSlice';
import UserCard from './userCard';

const EditProfile = ({ userDetails }) => {
  const [firstName, setFirstName] = useState(userDetails.firstName);
  const [lastName, setLastName] = useState(userDetails.lastName);
  const [age, setAge] = useState(userDetails.age);
  const [gender, setGender] = useState(userDetails.gender);
  const [about, setAbout] = useState(userDetails.about);
  const [photoUrl, setPhotoUrl] = useState(userDetails.photoUrl);
  const [skills, setSkills] = useState(userDetails.skills || []); // new
  const [error, setError] = useState("");
  const [showNotification,setShowNotification] = useState(false);
  const dispatch = useDispatch();


  const handleUpdate = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, about, photoUrl, skills },
        { withCredentials: true }
      );
      
      dispatch(addUser(res.data.user));
      setShowNotification(true);
      setTimeout(()=>{
        setShowNotification(false);
      },3000);

    } catch (err) {
      setError(err.response?.data || "Something went wrong");
    }
  };

  return (
    <div className='flex flex-col md:flex-row justify-center items-start gap-10 p-6'>
        {showNotification &&
            <div className="toast toast-top toast-center fixed z-50">
                <div className="alert alert-success">
                    <span>Profile Updated Sucessfully</span>
                </div>
            </div>
        }
        <div className="flex justify-center">
        <div className="card bg-base-300 shadow-sm text-primary-content w-96">
            <div className="card-body">
            <h2 className="card-title text-center justify-center text-2xl">Edit Profile</h2>

            {/* First Name */}
            <div className="form-control">
                <label className="label"><span className="label-text">First Name:</span></label>
                <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input input-bordered w-full my-2"
                required
                />
            </div>

            {/* Last Name */}
            <div className="form-control">
                <label className="label"><span className="label-text">Last Name:</span></label>
                <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input input-bordered w-full my-2"
                required
                />
            </div>

            {/* Age */}
            <div className="form-control">
                <label className="label"><span className="label-text">Age:</span></label>
                <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="input input-bordered w-full my-2"
                required
                />
            </div>

            {/* Gender */}
            <div className="form-control">
                <label className="label"><span className="label-text">Gender:</span></label>
                <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="select select-bordered w-full my-2"
                required
                >
                <option value="" disabled>Select your gender</option>
                <option value="male">male</option>
                <option value="female">female</option>
                <option value="other">other</option>
                </select>
            </div>

            {/* About */}
            <div className="form-control">
                <label className="label"><span className="label-text">About:</span></label>
                <input
                type="text"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="input input-bordered w-full my-2"
                required
                />
            </div>

            {/* Photo URL */}
            <div className="form-control">
                <label className="label"><span className="label-text">Photo URL:</span></label>
                <input
                type="text"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="input input-bordered w-full my-2"
                required
                />
            </div>

            {/* Skills */}
            <div className="form-control">
                <label className="label"><span className="label-text">Skills:</span></label>
                <input
                type="text"
                placeholder="Enter skills separated by commas"
                value={skills.join(", ")}
                onChange={(e) => setSkills(e.target.value.split(",").map(s => s.trim()))}
                className="input input-bordered w-full my-2"
                />
            </div>

            {/* Error */}
            <span className="text-rose-700 text-center">{error}</span>

            {/* Save Button */}
            <div className="card-actions justify-end mt-6">
                <button className="btn btn-primary w-full" onClick={handleUpdate}>
                Save
                </button>
            </div>
            </div>
        </div>
        </div>
        <div className="flex justify-center">
            <UserCard userDetails={{ firstName, lastName, age, gender, photoUrl, about, skills }} />
        </div>
    </div>
  );
};

export default EditProfile;
