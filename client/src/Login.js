import { getByPlaceholderText } from '@testing-library/react';
import React, { useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom"
import {Home} from './Home';
import { Register } from './Register';

export const Login = (props) => {

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    
    fetch('http://localhost:4000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: pass
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
        props.usernameSetterFunction(data.username.toUpperCase());
        navigate('/map'); // after successful login navigate to leaflet     
      })
      .catch((response) => {
        response.json().then((json) => {
          alert(json.message);
        })
      });
  };

  return (
    <div className='auth-form-container'>
      <h1>Population Growth</h1>
      <h2>Login</h2>
      <form className='login-form' onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          value={email}
          type="email"
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          required={true}
        />
        <label htmlFor="password">Password:</label>
        <input
          value={pass}
          type="password"
          placeholder="********"
          id="password"
          name="password"
          onChange={(e) => setPass(e.target.value)}
          required={true}
        />
        <button type="submit">Login</button >
      </form>
      {/* <button className='link-btn' onClick={() => props.onFormSwitch('register')}>
        Don't have an account? Register here
      </button> */}
    </div>
  );
};
