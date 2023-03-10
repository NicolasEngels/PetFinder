import logo from "../Assets/chat-logo.png"
import { useEffect, useState } from "react";
import axios from 'axios'

function HomePage() {
const url= "https://petfinder.herokuapp.com/getAllPosts"
const [infos, setInfos] = useState([]);

    useEffect(() => {
        const getInfos = async () => {
          try {
            const response = await axios.get(url, {
              headers: {
                "ngrok-skip-browser-warning": "69420",
              },
            });
            console.log(response)
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

    return (
        <div id="home">
            <div id="top">
                <button className="button find"><a href="/find">FIND</a></button>

                <img src={logo} alt="logo" id="logo"></img>

                <button className="button lost"><a href="/lost">LOST</a></button>
            </div>

            <main>
                <div id="search">
                    <input type="text" id="location"/>

                    <select name="sort" id="sort">
                        <option value="">sort by</option>
                        <option value="distance">distance</option>
                        <option value="recent">recent</option>
                    </select>
                </div>

                <div id="map">
                    <p>map</p>
                </div>

                <div id="posts">

                </div>
            </main>
        </div>
    )
}

export default HomePage;
