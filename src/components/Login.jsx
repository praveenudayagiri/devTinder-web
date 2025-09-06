import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email,setEmail] = useState("praveen@gmail.com");
    const [password,setPassword] = useState("Praveen@1234");
    const [error,setError] = useState("");
    const dispatch  = useDispatch();
    const navigate = useNavigate();
    const handleLogin = async()=>{
        try{
            const loginData = await axios.post(BASE_URL+"/login",
            {
                email,
                password
            },
            {
                withCredentials:true
            }
            );
            dispatch(addUser(loginData.data));
            navigate("/");
            
        }
        catch(err){
            setError(err.response.data);
            
        }
    }
  return (
    <div className="flex justify-center my-35">
      <div className="card bg-base-300 shadow-sm text-primary-content w-96">
        <div className="card-body">
          <h2 className="card-title text-center justify-center text-2xl">Login</h2>

          
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value = {email}
              onChange={(e)=>setEmail(e.target.value)}
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
              onChange={(e)=> setPassword(e.target.value)}
              className="input input-bordered w-full my-2"
              required
            />
          </div>
          <span className="text-rose-700 text-center">{error}</span>
          
          <div className="card-actions justify-end mt-6">
            <button className="btn btn-primary w-full"
            onClick={handleLogin}
            >Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
