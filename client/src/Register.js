import React, { useState } from 'react';
import { getByPlaceholderText } from '@testing-library/react';
import { Navigate, useNavigate } from "react-router-dom"
import { Login } from './Login';

export const Register = (props) => {
     const [name,Setname] = useState(''); 
     const [email,setEmail] = useState('');
     const [pass,setPass]= useState('');
     const [city, setCity] = useState('');
     const Navigate = useNavigate();

     const handleSbmit = (e) => {
        e.preventDefault();
        console.log(email);
        console.log(pass);
        console.log(name);
        console.log(city);
        Navigate("/Login")

      };

     return (
        <div className='auth-form-container'>
        <h1> Population Growth</h1> 
        <h2>Register</h2>
        <form className='register-form'onSubmit={handleSbmit}>
            <label htmlFor="Full Name">Name:</label>
            <input value={name} type="full name"
             placeholder="full name" id="full name" name="full name"
             onChange={(e) => Setname(e.target.value)}
             />
            <label htmlFor="email">Email:</label>
            <input value={email} type="email" placeholder="youremail@gmail.com"
             id="email" name="email"
             onChange={(e) => setEmail(e.target.value)}
             />
            <label htmlFor="password">Password:</label>
            <input value={pass} type="password" placeholder="********"
             id="password" name="password"
             onChange={(e) => setPass(e.target.value)}
             />
            <label htmlFor="livingcity">city:</label>
            <input value={city} type="livingcity" placeholder="city" 
            id="livingcity" name="livingcity"
            onChange={(e) => setCity(e.target.value)}
            />
            <button type="submit"> Register </button>
        </form>
        <button className='link-btn' onClick={() => props.onFormSwitch('login')} >
            Already have an account? Register here</button>

        </div>
        )

        
    }

    