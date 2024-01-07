import React, { useState } from 'react';
import { getByPlaceholderText } from '@testing-library/react';
import { Navigate, useNavigate } from "react-router-dom"
import { Login } from './Login';

export const Register = (props) => {
     const [name,Setname] = useState(''); 
     const [email,setEmail] = useState('');
     const [pass,setPass]= useState('');
     const [city, setCity] = useState('');
     const navigate = useNavigate();

     const handleSbmit = (e) => {
        e.preventDefault();
        fetch('http://pop-map-server.onrender.com/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: pass,
        email: email,
        city: city
      })
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 500 ) {
          return Promise.reject(response);
        }
      })
      .then(data => {
        navigate('/login'); // after successful signup navigate to login   
      })
      .catch((response) => {
        response.json().then((json) => {
          alert(json.message);
        })
      });

      };

     return (
      <div className='auth-form-container'>
      <h1> Population Growth</h1> 
      <h2>Register</h2>
      <form className='register-form'onSubmit={handleSbmit}>
          <label htmlFor="Full Name">Name:</label>
          <input value={username}
           placeholder="Username" id="username" name="username"
           onChange={(e) => Setname(e.target.value)}
           required={true}/>
          <label htmlFor="email">Email:</label>
          <input value={email} type="email" placeholder="youremail@gmail.com"
           id="email" name="email"
           onChange={(e) => setEmail(e.target.value)}
           required={true}/>
          <label htmlFor="password">Password:</label>
          <input value={pass} type="password" placeholder="********"
           id="password" name="password"
           onChange={(e) => setPass(e.target.value)}
           required={true}/>
          <label htmlFor="livingcity">city:</label>
          <input value={city} placeholder="city" 
          id="livingcity" name="livingcity"
          onChange={(e) => setCity(e.target.value)}
          required={true}/>
          <button type="submit"> Register </button>
        </form>
        </div>
        )

        
    }

    