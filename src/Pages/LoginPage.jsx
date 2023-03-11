
import { useForm } from 'react-hook-form';
import { useAuth } from '../Components/Auth';
import { useNavigate,useLocation } from "react-router-dom";
import React from 'react';
import {NavLink} from 'react-router-dom'
import logo from "../Assets/chat-logo.png"


function LoginPage () {
  const {register,handleSubmit} = useForm();
  const location =useLocation()
  const auth = useAuth();
  const redirectPath = location.state?.path || '/'
  let navigate = useNavigate();
 
  const onSubmit = async (data = {}) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: data.email, password: data.password }), 
      credentials: 'include'
    };
    try {
      const response = await fetch('https://petfinder.herokuapp.com/login', requestOptions);
      const responseData = await response.json();
      console.log(responseData);
      const userId = responseData.id;
      localStorage.setItem("user_id", userId);
      auth.login(responseData.id); // login the user
      navigate(redirectPath); // redirect to the requested page after login
    } catch (error) {
      console.log(error);
    }
  };

  return (
  <div className="flex col align-center  ">
    <NavLink to="/" >
      <img src={logo} alt="logo" id="logo"></img>
    </NavLink>
      <form className="flex col justify-center align-center " onSubmit={handleSubmit(onSubmit)}>
            <input className="input" type="email" placeholder="Email"{...register("email")}/>
            <input className="input" type="password" placeholder="Password" {...register("password")}/>
            <button className="submit" type="submit">Login</button>
            <NavLink to="/signup" className="signup" type="submit">SignUp</NavLink>
      </form>
  </div>
  );

}

export default LoginPage;


