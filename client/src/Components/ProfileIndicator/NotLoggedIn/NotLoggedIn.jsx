import './NotLoggedIn.css'
import React from 'react'
import { Link } from 'react-router-dom';

export default function NotLoggedIn() {
  return (
    <div className='NotLoggedIn'>
      <Link to="/signin">Sign In</Link> &nbsp;|&nbsp; 
      <Link to="/signup">Sign Up</Link>
    </div>
  )
}
