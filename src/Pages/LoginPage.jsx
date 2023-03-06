import axios from "axios"
import { useForm } from 'react-hook-form';
import { useAuth } from '../Components/Auth';
import { useNavigate,useLocation } from "react-router-dom";
import React from 'react';


function LoginPage () {
  const {register,handleSubmit} = useForm();
  const location =useLocation()
  
  const auth = useAuth();
  const redirectPath = location.state?.path || '/'
    let navigate = useNavigate();
 
 const onSubmit = async (data = {}) => {
  axios
    .post("/user/login", data)
    .then((response) => {
      console.log(response);
      const userId = response.data.id;
      console.log(userId);
      localStorage.setItem("user_id", userId);
      auth.login(response.data.id); // login the user
      navigate(redirectPath); // redirect to the requested page after login
    })
    .catch((error) => {
      console.log(error);
    });
};
  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="email"  id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email"{...register("email")}/>
            <input type="password"  id="exampleInputPassword1" placeholder="Password" {...register("password")}/>
            <button type="submit" >Login</button>
        </form>
    </div>
   

  );

}

export default LoginPage;


