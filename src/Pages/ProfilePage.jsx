import {useAuth} from '../Components/Auth'
import {NavLink, useNavigate} from 'react-router-dom'
import axios from 'axios';
import { useState, useEffect} from "react"
import { useForm } from 'react-hook-form';

const ProfilePage = () => {
  const { register, handleSubmit} = useForm();
  const auth = useAuth()
  const user_id=auth.user;
  const navigate=useNavigate()
  const [infos, setInfos] = useState([]);
  const url = `https://petfinder.herokuapp.com/profile/${user_id}`;

   const Logout = async () => {
    try {
      await axios.get("https://petfinder.herokuapp.com/logout", {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      });
      console.log("logout sucess")
      auth.logout()
      navigate('/')
    }
    catch (error) {
    console.log(error);
    }
  }

    useEffect(() => {
      const getInfos = async () => {
        try {
          const response = await axios.get(url, {
            headers: {
              "ngrok-skip-browser-warning": "69420",
            },
          });
        const username=response.data.username
        const email=response.data.email
        const firstname=response.data.first_name
        const lastname=response.data.last_name
        const newInfos= {username, email, firstname, lastname}
        setInfos(newInfos);
      }
      catch (error) {
      console.log(error);
      }
    }
    getInfos() 
    });
    
    const onSubmit = async (data) => {
      console.log(data);
      try {
        const response = await axios.post(
          "https://petfinder.herokuapp.com/insertProfileInfos",
          { ...data },
          {
            headers: {
              "ngrok-skip-browser-warning": "69420",
            },
          }
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

   return (     
    <div>
      <NavLink to="/lost">
            Home
            </NavLink>
        <button onClick={Logout} type="button">
            Logout
        </button>
      <div >
        {infos.map((msg) => (
          <div>
            <button>-</button>
             {msg.content}{" "}
          </div>
        ))}
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="name" placeholder="First Name"{...register("name")}/>
            <input type="name" placeholder="Last Name" {...register("lastname")}/>
            <input type="adress" placeholder="Adress" {...register("adress")}/>
            <input type="name" placeholder="Phone" {...register("phone")}/>
            <input type="email" placeholder="Email" {...register("email")}/>
            <input type="number" placeholder="2" {...register("user_id")}/>
            <button type="submit">Update</button>
        </form>
      </div>
    </div>
  )
}


export default ProfilePage;
