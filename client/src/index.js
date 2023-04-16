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
import "./styles.css"
import { Login } from './Login';
import { Register } from './Register';
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />

//   },
// ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <RouterProvider router={router}></RouterProvider>  */}
    <BrowserRouter>
      {/* <Routes>
        <Route index element={<App />}/>
        <Route path = "login" element={<Login />}/> 
        <Route path = "register" element={<Register />}/> 
      </Routes> */}
      <App/>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
