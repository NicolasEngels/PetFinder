import logo from "../Assets/chat-logo.png"
import { useEffect, useState } from "react";
import cat from '../Assets/cat.png';
import { LeafletContainer } from "../Components/maps/leaflet-container";
import { LeafletMap } from "../Components/maps/leaflet-map";
import { NavLink } from "react-router-dom";


function HomePage() {
const url= "https://petfinder.herokuapp.com/getAllPosts"
const [infos, setInfos] = useState([]);
const [buildings, setBuildings] = useState([]);
useEffect(() => {
  const getInfos = async () => {
    try {
        const response = await fetch(
            url,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            }
        );
        const data = await response.json();
        setInfos(data);
        console.log(data)
    } catch (error) {
        console.log(error);
    }
  };
  
  getInfos();
}, []);



return (
  <div id="home">
      <div id="top">
          <button className="button find"><a href="/find">FIND</a></button>

          <img src={logo} alt="logo" id="logo"></img>

          <button className="button lost"><a href="/lost">LOST</a></button>
      </div>

      <main>
      <div id="search">
              <input placeholder="Location" type="text" id="location"/>

              <select name="sort" id="sort">
                  <option value="">sort by</option>
                  <option value="distance">distance</option>
                  <option value="recent">recent</option>
              </select>
          </div>
      <LeafletContainer>
          <LeafletMap
          buildings={buildings}/>
        </LeafletContainer>
        <NavLink className="a" to="/list">List</NavLink>
      </main>
  </div>
);

}

export default HomePage;
