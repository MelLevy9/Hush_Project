import './LoggedIn.css';
import React from 'react'
import { useContext } from 'react';
import { AuthContext } from '../../../context/authContext';
import { Link } from 'react-router-dom';

export default function LoggedIn() {
  
  const { userData, signOut } = useContext(AuthContext);
  
  return (
    <div className='LoggedIn'>
      <div>Hi<Link to='/profile'>{userData.userName}</Link></div>
      
      <img className='signout-icon' onClick={()=>signOut()} src='/sign-out.svg' alt='sign out'/>
    </div>
  )
}
