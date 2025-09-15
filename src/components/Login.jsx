import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("praveen@gmail.com");
  const [password, setPassword] = useState("Praveen@1234");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = async () => {
    try {
      if (!email || !password || (!isLoginForm && (!firstName || !lastName))) {
        setError("Please fill in all required fields");
        return;
      }

      if (isLoginForm) {
        const loginData = await axios.post(
          BASE_URL + "/login",
          { email, password },
          { withCredentials: true }
        );
        if (loginData?.data) {
          dispatch(addUser(loginData.data));
          navigate("/");
        }
      } else {
        const signupData = await axios.post(
          BASE_URL + "/signup",
          { firstName, lastName, email, password },
          { withCredentials: true }
        );
        if (signupData?.data) {
          dispatch(addUser(signupData.data));
          navigate("/profile");
        }
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data ||
          err.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <div className="flex justify-center my-35">
      <div className="card bg-base-300 shadow-sm text-primary-content w-96">
        <div className="card-body">
          <h2 className="card-title text-center justify-center text-2xl">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>

          {!isLoginForm && (
            <>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input input-bordered w-full my-2"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Last Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input input-bordered w-full my-2"
                  required
                />
              </div>
            </>
          )}

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full my-2"
              required
            />
          </div>

          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full my-2"
              required
            />
          </div>

          {error && (
            <span className="text-rose-700 text-center">{error}</span>
          )}

          <div className="card-actions justify-end mt-6">
            <button className="btn btn-primary w-full" onClick={handleSubmit}>
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>

          <p
            onClick={() => {
              setIsLoginForm(!isLoginForm);
              setError("");
            }}
            className="flex justify-center cursor-pointer text-blue-600 mt-4"
          >
            {isLoginForm
              ? "New User? Signup here"
              : "Already a user? Login here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
