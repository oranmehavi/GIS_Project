import { getByPlaceholderText } from '@testing-library/react';
import React, { useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom"
import {Home} from './Home';
import { Register } from './Register';

export const Login = (props) => {

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const Navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
     console.log(email);
     console.log(pass);
     Navigate("/Home")

  }

  const handleLogin = () => {
    // Redirect to a local HTML file after login
    window.location.href = "file:///C:/Users/USER/Desktop/%D7%A4%D7%99%D7%AA%D7%95%D7%97%20GIS/Cities/Cities/Cities/qgis2web_2023_03_26-18_23_55_990884/index.html#12/32.0306/34.8068";
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
        />
        <label htmlFor="password">Password:</label>
        <input
          value={pass}
          type="password"
          placeholder="********"
          id="password"
          name="password"
          onChange={(e) => setPass(e.target.value)}
        />
        <button type="submit">Login</button >
      </form>
      <button className='link-btn' onClick={() => props.onFormSwitch('register')}>
        Don't have an account? Register here
      </button>
    </div>
  )
}
