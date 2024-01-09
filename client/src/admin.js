import React, { useState } from 'react';



export const Admin = (props) => {
    const [file, setFile] = useState(null);
    


     const handleFileUpload = (event) => {
        setFile(event.target.files[0]);
      };

     const handleUpload = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
    fetch('https://pop-map-server.onrender.com/api/uploadfile', {
        method: 'POST',
      body: formData})
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
        <h1> Pop Map</h1> 
        <h2>Admin</h2>
        <div>
            <input type="file" name="file" id="file" onChange={handleFileUpload} />
            <button onClick={handleUpload}>Upload</button>
        </div>
        </div>
      )

        
    }
