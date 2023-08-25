import './SignUpForm.css'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../context/authContext';
import { useContext } from 'react';


export default function SignUpForm() {
  
    const navigate = useNavigate();
  
    const { signUp } = useContext(AuthContext);
    
    const [userName, setUserName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      await signUp(userName, email, password);
      return navigate('/');
    }
  
    return (
      <div className='SignUpForm'>
        <form onSubmit={(e)=>handleSubmit(e)}>
  
          <label htmlFor="userName">User Name </label> &nbsp;
          <input type="text" name='userName' onChange={(e)=>setUserName(e.target.value)} placeholder='create userName'/>
  
          <br/><br/>

          <label htmlFor="email">Email </label> &nbsp;
          <input type="text" name='email' onChange={(e)=>setEmail(e.target.value)} placeholder='enter your email'/>
  
          <br/><br/>
  
          <label htmlFor="password">Password </label> &nbsp;
          <input type="password" name='password' onChange={(e)=>setPassword(e.target.value)}  placeholder='create a password'/>
  
          <br/><br/>
  
          <button type='submit'>Sign Up</button>
          
          <br/><br/><br/><br/>

          <img src="/shadowFavicon.png" alt="hush favicon" />
  
        </form>
      </div>
    )
}
