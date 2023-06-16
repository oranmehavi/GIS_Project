import React, {useState} from 'react';
import './App.css';
import './Navbar.css';
import {Login} from "./Login";
import {Register} from "./Register";
import Navbar from './Navbar';
import Home from './Home';
import Map from './map.js'
import {Admin} from './admin.js'
import { Route,Routes} from 'react-router-dom';


 function App() { 

  const [username,setUsername] = useState('');
  const [isAdmin,setIsAdmin] = useState(false);

  const usernameSetterFunction = (userToBeSet) => {
    setIsAdmin(userToBeSet.is_admin)
    setUsername(userToBeSet.username.toUpperCase());
  }
   return(
    <div>   
     <>
      <Navbar username={username} isAdmin={isAdmin}/>
     <div className= "container"></div> 
      <Routes>
       <Route path = "Home" element={<Home />}/> 
       <Route path = "Map" element={<Map />}/> 
       <Route path = "Admin" element={<Admin />}/> 
       <Route path = "login" element={<Login usernameSetterFunction={usernameSetterFunction}/>}/> 
       <Route path = "register" element={<Register />}/> 
      </Routes> 
      </>
      </div>
  );
 }

export default App;
        