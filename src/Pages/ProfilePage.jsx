import {useAuth} from '../Components/Auth'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import { useState, useEffect} from "react"

const ProfilePageLayout = () => {
   const auth = useAuth()
   const navigate=useNavigate()
   const [infos, setInfos] = useState([]);

   const Logout = async () => {
    try {
      await axios.get("/user/logout", {
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
          const response = await axios.get(`/user/profile`, {
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
    }, []);

   return (     
    <div>
        <button onClick={Logout} type="button">
            Logout
        </button>

        <div>
          HELLO {infos.username} !
        </div>

      <h1 >POSTS</h1>
      <div >
        {infos.map((msg) => (
          <div>
            <button>-</button>
             {msg.content}{" "}
          </div>
        ))}
      </div>
    </div>
  )
}


export default ProfilePageLayout;
