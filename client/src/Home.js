import { Form } from "react-router-dom"
import './App.css'; 
import React, { useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import video from './video-2.mp4';

export default function Home(){
    return(
      <div className="HOME-Page" >
        <video src={video} autoPlay loop muted />
         <h4>welcome</h4>

      </div>
   
       


    );
}

