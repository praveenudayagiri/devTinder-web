import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";

const defaultAvatars = {
  male: "https://i.pinimg.com/736x/d6/36/d5/d636d53048eccf75fed71e3add231b94.jpg",
  female: "https://img.freepik.com/premium-photo/3d-illustration-cartoon-business-woman-character-avatar-profile_1183071-541.jpg",
  other: "https://tse3.mm.bing.net/th/id/OIP.XIIqDp2nB7ngeav_4xy-IgHaHa?r=0&cb=ucfimgc2&w=980&h=980&rs=1&pid=ImgDetMain&o=7&rm=3",
};

const EditProfile = ({ userDetails }) => {
  const [firstName, setFirstName] = useState(userDetails?.firstName ?? "");
  const [lastName, setLastName] = useState(userDetails?.lastName ?? "");
  const [age, setAge] = useState(userDetails?.age ?? "");
  const [gender, setGender] = useState(userDetails?.gender ?? "male");
  const [about, setAbout] = useState(userDetails?.about ?? "");
  const [customPhotoUrl, setCustomPhotoUrl] = useState(userDetails?.photoUrl ?? "");
  const [skills, setSkills] = useState(userDetails?.skills || []); // ✅ same as your old logic
  const [error, setError] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const dispatch = useDispatch();

  const photoUrl = customPhotoUrl || defaultAvatars[gender];

  const handleUpdate = async () => {
    try {
      if (!firstName || !lastName || !age || !gender) {
        setError("Please fill in all required fields");
        return;
      }
      setError("");
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, about, photoUrl, skills },
        { withCredentials: true }
      );

      if (res?.data?.user) {
        dispatch(addUser(res.data.user));
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-start gap-10 p-6">
      {showNotification && (
        <div className="toast toast-top toast-center fixed z-50">
          <div className="alert alert-success">
            <span>Profile Updated Successfully</span>
          </div>
        </div>
      )}

      <div className="flex justify-center">
        <div className="card bg-base-300 shadow-sm text-primary-content w-96">
          <div className="card-body">
            <h2 className="card-title text-center justify-center text-2xl">Edit Profile</h2>

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

            <div className="form-control">
              <label className="label"><span className="label-text">Gender:</span></label>
              <select
                value={gender}
                onChange={(e) => {
                  setGender(e.target.value);
                  setCustomPhotoUrl("");
                }}
                className="select select-bordered w-full my-2"
                required
              >
                <option value="" disabled>Select your gender</option>
                <option value="male">male</option>
                <option value="female">female</option>
                <option value="other">other</option>
              </select>
            </div>

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

            <div className="form-control">
              <label className="label"><span className="label-text">Photo URL (optional)</span></label>
              <input
                type="text"
                value={customPhotoUrl}
                onChange={(e) => setCustomPhotoUrl(e.target.value)}
                className="input input-bordered w-full my-2"
                placeholder="Enter your own photo URL"
              />
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">Skills:</span></label>
              <input
                type="text"
                placeholder="Enter skills separated by commas"
                value={Array.isArray(skills) ? skills.join(", ") : ""}
                onChange={(e) => setSkills(e.target.value.split(",").map(s => s.trim()))}
                className="input input-bordered w-full my-2"
              />
            </div>

            <span className="text-rose-700 text-center">{error}</span>

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
