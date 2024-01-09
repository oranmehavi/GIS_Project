import React, {useState, useEffect} from "react"
import { children } from "react"
import { Link, useMatch ,useResolvedPath } from "react-router-dom"
import pepole from './pepole.jpg';
import build from './build.jpg';


export default function Navbar(props){
   
  const [username, setUsername] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    console.log("isAdmin: ",props.isAdmin)
      setUsername(props.username);
      setIsAdmin(props.isAdmin);
  }, [props.username, props.isAdmin]);
  
  return (
      
      <>
    <nav className="nav">
        <Link to="/" className="PopuHlation-Growth">
          Pop Map
        </Link>
        <ul>
          <CustomLink to="/Login">Login</CustomLink>
          <CustomLink to="/Register">Register</CustomLink>
          {isAdmin?<CustomLink to="/Admin">Admin</CustomLink>:null}
        </ul>

        <Username name={username} />
      </nav>
      </>
  );
}

function CustomLink({to, children, ...props}) {
   const resolvePath = useResolvedPath(to)
   const isActive = useMatch({path: resolvePath.pathname , end :true})
  console.log("CustomLink pathname:", window.location.pathname)
  const path = window.location.pathname
  return (
    <li className={path === to ? "active" : ""}>
      <Link to={to} {...props}>{children}</Link>
    </li>
  )
}

function Username({ name }) {
if (name) {
  console.log(name);
  return <h3 className="item">{name}</h3>;
}
return null;
}