import React, { useState } from 'react';
import { getByPlaceholderText } from '@testing-library/react';
import { Navigate, useNavigate } from "react-router-dom"


export const Admin = (props) => {
    const [file, setFile] = useState(null);
    const navigate = useNavigate();


     const handleFileUpload = (event) => {
        setFile(event.target.files[0]);
      };

     const handleUpload = (e) => {
        e.preventDefault();
    
    fetch('http://localhost:4000/api/uploadfile', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
      },
      body:file})
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 500 ) {
          return Promise.reject(response);
        }
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
        <h2>Admin</h2>
        <div>
            <input type="file" name="file" id="file" onChange={handleFileUpload} />
            <button onClick={handleUpload}>Upload</button>
        </div>
        {/* <button className='link-btn' onClick={() => props.onFormSwitch('login')} >
            Already have an account? Register here</button> */}

        </div>
        )

        
    }

    