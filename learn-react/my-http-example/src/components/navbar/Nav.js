import React from "react";
import "./NavStyles.css";
import { Link } from "react-router-dom";

export default function Nav(){

  return(
        <div className="navbar">
          <div className="logo">My App</div>
           <ul className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/words">Words</Link>
              <Link to="/file-search">File Search</Link>
              <Link to="/check-box">Check Box Test</Link>
           </ul>
        </div>
  );

}