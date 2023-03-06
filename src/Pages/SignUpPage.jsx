import React, { useRef } from 'react';
import axios from "axios";
import { useNavigate, useLocation } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || '/';
  const inputRefUsername = useRef();
  const inputRefEmail = useRef();
  const inputRefPassword = useRef();
  const inputRefLastName = useRef();
  const inputRefConfPassword = useRef();
  const inputRefFirstName =useRef();

  const onSubmit =  (e) => {
    e.preventDefault();
    const data = {
      username: inputRefUsername.current.value,
      last_name: inputRefLastName.current.value,
      first_name: inputRefFirstName.current.value,
      email: inputRefEmail.current.value,
      password: inputRefPassword.current.value,
      confirm_password: inputRefConfPassword.current.value,
    };
    console.log(data)
   
    axios
    .post("/user/register", data)
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
          <input ref={inputRefUsername}  type="text"  placeholder="User Name"></input>

          <label  htmlFor="typeText"></label>
          <input ref={inputRefFirstName} type="text"  placeholder="First Name"></input>
                   
          <label htmlFor="typeText"></label>
          <input ref={inputRefLastName} type="text" placeholder="Last Name"></input>

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