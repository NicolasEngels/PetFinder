import {useAuth} from '../Components/Auth'
import {NavLink, useNavigate} from 'react-router-dom'
import axios from 'axios';
import { useState} from "react"

const LostPage = () => {
    const auth = useAuth()
    const user_id=auth.user;
    const navigate=useNavigate()

  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState('');
  const [location, setLocation] = useState('');
  const [category_id, setCategoryId] = useState('');
  const [animal_id, setAnimalId] = useState('');
  const profile_id = user_id;
 
  
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('photo', photo);
    formData.append('description', description);
    formData.append('location', location);
    formData.append('category_id', category_id);
    formData.append('animal_id', animal_id);
    formData.append('profile_id', profile_id);
    console.log(formData)
    try {
      const response = await axios.post(
        `https://petfinder.herokuapp.com/profile/${user_id}/insertPost`,
        formData,
      );
      console.log(response);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
    

    return (
      <div>
      <NavLink to="/">
            Home
    </NavLink>

      <form onSubmit={onSubmit}>
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <br />
        <label>
          Location:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <br />
        <label>
          Category:
          <select value={category_id} onChange={(e) => setCategoryId(e.target.value)}>
            <option value="">Select a category</option>
            <option value="4">Lost</option>
            <option value="5">Found</option>
          </select>
        </label>
        <br />
        <label>
          Animal:
          <select value={animal_id} onChange={(e) => setAnimalId(e.target.value)}>
            <option value="">Select an animal</option>
            <option value="1">Cat</option>
            <option value="2">Dog</option>
            <option value="3">Other</option>
          </select>
        </label>
        <br />
        <label>
  Photo:
  <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />
</label>

        <button type="submit">Submit</button>
      </form>
    </div>)

}

export default LostPage;