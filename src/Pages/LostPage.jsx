import { useAuth } from '../Components/Auth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logo from "../Assets/chat-logo.png";
import { NavLink } from 'react-router-dom';

const LostPage = () => {
  const auth = useAuth();
  const user_id = auth.user;
  const navigate = useNavigate();

  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState('');
  const [location, setLocation] = useState('');
  const [animal_id, setAnimalId] = useState('');
  const profile_id = user_id;
  const category_id = 4;

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('photo', photo);
    formData.append('description', description);
    formData.append('location', location);
    formData.append('category_id', category_id);
    formData.append('animal_id', animal_id);
    formData.append('profile_id', profile_id);
    console.log(formData);
    const jsonData = {};
    formData.forEach((value, key) => {
      jsonData[key] = value;
    });

    try {
      const response = await fetch(
        `https://petfinder.herokuapp.com/profile/${user_id}/insertPost`,
        {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(jsonData)
        })
      console.log(response);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div id="LostFind">
      <NavLink to="/" >
      <img src={logo} alt="logo" id="logo"></img>
    </NavLink>
         
      <div className="Lost">
        <h3 className="text-center">LOST</h3>
        <form className="flex justify-center align-center col" onSubmit={onSubmit}>
          <input
            id="barsearch"
            placeholder="Where is the pet ?"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
              <select
                className="animal"
                value={animal_id}
                onChange={(e) => setAnimalId(e.target.value)}
              >
                <option value="">Select an animal</option>
                <option value="1">Cat</option>
                <option value="2">Dog</option>
                <option value="3">Others</option>
              </select>

              <div className="picture">
  {photo ? (
  <img
  src={URL.createObjectURL(photo)}
  alt="Uploaded"
  style={{ objectFit: "cover", height: "200px", borderRadius: "5px", 
  width:"200px",
  boxSizing: "border-box"  }}
/>
  ) : (
    <>
      Download a picture
      <input
        type="file"
        onChange={(e) => setPhoto(e.target.files[0])}
      />
    </>
  )}
</div>


          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Breed/Description"
            className="description"
          />
          <button className="submit" type="submit">Submit</button>
      </form>
    
    </div>
   
  </div>
  )
}

export default LostPage;