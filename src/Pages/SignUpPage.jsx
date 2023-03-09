import React, { useRef } from 'react';
import axios from "axios";
import { useNavigate, useLocation } from 'react-router-dom';
import {NavLink} from 'react-router-dom'
import logo from "../Assets/chat-logo.png"


function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || '/';
  const inputRefEmail = useRef();
  const inputRefPassword = useRef();
  const inputRefConfPassword = useRef();

  const onSubmit =  (e) => {
    e.preventDefault();
    const data = {
      email: inputRefEmail.current.value,
      password: inputRefPassword.current.value,
      confirm_password: inputRefConfPassword.current.value,
    };
    console.log(data)
   
    axios
    .post( "https://petfinder.herokuapp.com/register", data)
     .then((response) => {
        console.log(response);
        navigate(redirectPath, { replace: true });
      }) 
      .catch((error) => {
        console.log(error);
      }); 
    } 
  
  return (
       <div className="flex col align-center TOP">
    <NavLink to="/" >
      <img src={logo} alt="logo" id="logo"></img>
    </NavLink>

       <form className="flex col justify-center align-center full" onSubmit={onSubmit}>
          <h3>Sign Up</h3>

          <label htmlFor="typeText"></label>
          <input className="input" ref={inputRefEmail} name="email"  type="email" placeholder="Enter your email" />
               
          <label  htmlFor="typeText"></label>
          <input className="input" ref={inputRefPassword} type="password" placeholder="Password" />
                
          <label htmlFor="typeText"></label>
          <input className="input" ref={inputRefConfPassword} type="confirmpassword"  placeholder="Confirm password" />  
            
          <button className='submit' type="submit" >Sign Up!</button>
        </form>
    </div>
   
  )
}
export default SignUp;