import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Route,
  Routes,
  createBrowserRouter,
  Router,
  RouterProvider,
} from "react-router-dom";
import { Login } from './Login';
// import "./styles.css";
import { Register } from './Register';
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />

//   },
// ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
   
    <BrowserRouter>
      {/* <Routes>
        <Route index element={<App />}/>
        <Route path = "login" element={<Login />}/> 
        <Route path = "register" element={<Register />}/> 
      </Routes> */}
      <App/>
    </BrowserRouter>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
