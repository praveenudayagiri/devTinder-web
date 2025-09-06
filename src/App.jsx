import {  useDispatch, useSelector } from "react-redux";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { BASE_URL } from "./utils/constants";
import axios from "axios";
import { addUser } from "./utils/userSlice";
import { useEffect } from "react";


const App = () =>{
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const FetchUserData = async() =>{
    if(userData) return;
    try{
        const userData = await axios.post(BASE_URL+"/profile/view",{},{
          withCredentials:true
        });
        dispatch(addUser(userData.data));
        navigate("");
    }
    catch(err){
          if(err.response.status===401){
            navigate("/login");
          }
          else console.error(err);
    }

  }

  useEffect(()=>{
    FetchUserData();
  },[]);


  return(
        <div>
          <Navbar/>
          <Outlet/>
          <Footer/>
        </div>
  )
}

export default App;