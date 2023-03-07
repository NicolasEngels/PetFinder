import React, { useRef } from 'react';
import axios from "axios";
import { useNavigate, useLocation } from 'react-router-dom';

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

    <div > 
       <form onSubmit={onSubmit}>
          <h2>Sign Up</h2>

          <label htmlFor="typeText"></label>
          <input ref={inputRefEmail} name="email"  type="email" placeholder="Enter your email" />
               
          <label  htmlFor="typeText"></label>
          <input ref={inputRefPassword} type="password" placeholder="Password" />
                
          <label htmlFor="typeText"></label>
          <input ref={inputRefConfPassword} type="confirmpassword"  placeholder="confirm Password" />  
            
          <button type="submit" >Sign Up!</button>
        </form>
    </div>
   
  )
}
export default SignUp;