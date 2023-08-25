import './Header.css'
import React, { useState } from "react";
import ProfileIndicator from '../ProfileIndicator/ProfileIndicator';
import { Link } from "react-router-dom";
import AllGroups from "../AllGroups/AllGroups";
import SearchPost from '../SearchPost/SearchPost';


export default function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);


  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };

  

  return (
    <nav className="navbar">
      <div className="logo">
        <img className="logoPic" src="/hushLogo.png" alt="Logo" />
        <span className="hush">Hush</span>
      </div>
      <div className={`navbar-links ${isMenuOpen ? 'show' : ''}`}>
        <ul>
          <li className="navLink"><Link to="/">Home</Link></li>
          <li className="navLink">
            <AllGroups/>
          </li>
         
          <div className="navLink search-container">
          <SearchPost/>
        </div>
        
          <li className="navLink user-profile">
            <ProfileIndicator />
          </li>
        </ul>
      </div>
      <div className="hamburger-icon" onClick={handleMenuToggle}>
        <div className={`bar ${isMenuOpen ? 'bar-open' : ''}`}></div>
        <div className={`bar ${isMenuOpen ? 'bar-open' : ''}`}></div>
        <div className={`bar ${isMenuOpen ? 'bar-open' : ''}`}></div>
      </div>
    </nav>
  );
}
