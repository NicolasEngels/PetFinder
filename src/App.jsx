import { createBrowserHistory } from 'history';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {AuthProvider} from "./Components/Auth"
import {RequireAuth} from './Components/RequireAuth'
import LoginPage from "./Pages/LoginPage.jsx"
import SignUpPage from './Pages/SignUpPage';
import ProfilePage from './Pages/ProfilePage';
import FindPage from './Pages/FindPage';
import LostPage from './Pages/LostPage';
import HomePage from './Pages/Homepage';
import PetPage from './Pages/PetPage';
import "./App.css"


const history = createBrowserHistory();

const App = () => {
  return (
    <div id='hey'>
      <AuthProvider>
        <BrowserRouter history={history}>
          <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/pet" element={<PetPage />}/>
            <Route path="/login" element={<LoginPage />} /> 
            <Route path="/signup" element={<SignUpPage/>}/>
            <Route path="/find" element={<RequireAuth><FindPage/></RequireAuth>}/> 
            <Route path="/lost" element={<RequireAuth><LostPage/></RequireAuth>}/> 
            <Route path="/profile" element={<RequireAuth><ProfilePage/></RequireAuth>}/>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
};

export default App;