import { useAuth } from '../Components/Auth';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../Style.css';
import logo from '../Assets/chat-logo.png';

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

    try {
      const response = await fetch(
        `https://petfinder.herokuapp.com/profile/${user_id}/insertPost`,
        {
          method: 'POST',
          body: formData,
        }
      );
      console.log(response);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="LostFind">
      <NavLink to="/">
        <img src={logo} alt="logo" id="logo"></img>
      </NavLink>
      <div className="Lost">
        <h3 className="text-center">LOST</h3>
        <form className="flex justify-center align-center col" onSubmit={onSubmit}>
          <input
            id="barsearch"
            placeholder="where is the pet ?"
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
                <option value="3">Other</option>
              </select>

            <label className="picture">
              <input
                type="file"
                onChange={(e) => setPhoto(e.target.files[0])}
              />
              Picture
            </label>
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