import logo from "../Assets/chat-logo.png"
import { useEffect, useState } from "react";
import cat from '../Assets/cat.png';
import { NavLink } from "react-router-dom";
function HomePageList() {
const url= "https://petfinder.herokuapp.com/getAllPosts"
const [infos, setInfos] = useState([]);

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

          <div id="posts">
    
    {infos.map((post) => (
      <div className="post" key={post.id}>
                     
                   
                        {post.category_id == 5 &&  
                          <h3 className="bg-green" > FIND {post.animal_id == 1 && "CAT"}
                            {post.animal_id == 2 && "DOG"}
                            {post.animal_id == 3 && "OTHERS"}
                          </h3>}
                        {post.category_id == 4 && 
                          <h3 className="bg-red"> LOST {post.animal_id == 1 && "CAT"}
                            {post.animal_id == 2 && "DOG"}
                            {post.animal_id == 3 && "OTHERS"}
                          </h3>}

                          {post.photo && (
                          <img className="postimage"
                            src={URL.createObjectURL(
                              new Blob([new Uint8Array(post.photo.data)])
                            )}
                            alt=""
                          />
                        )}  
                         <img className="postimage" src={cat} alt=""/>
                        <p> {post.description}</p>
                        <p>  {post.location}</p>
                        </div> 
                       
                   
                  )
                )}
          </div>
          <NavLink className="a" to="/">Map</NavLink>
      </main>
  </div>
);

}

export default HomePageList;
