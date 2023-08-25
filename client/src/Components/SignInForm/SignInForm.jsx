import './SignInForm.css'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../context/authContext';
import { useContext } from 'react';

export default function SignInForm() {

  const navigate = useNavigate();
  
  const { signIn } = useContext(AuthContext);
  
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
     await signIn(email, password);
      navigate('/');
  }

  return (
    <div className='SignInForm'>
      <form onSubmit={(e)=>handleSubmit(e)}>

        <label htmlFor="email">Email </label> &nbsp;
        <input type="text" name='email' onChange={(e)=>setEmail(e.target.value)} placeholder='enter your email'/>

        <br/><br/>

        <label htmlFor="password">Password </label> &nbsp;
        <input type="password" name='password' onChange={(e)=>setPassword(e.target.value)}  placeholder='enter your password'/>

        <br/><br/>

        <button type='submit'>Sign In</button>

        <br/><br/><br/><br/>

        <img src="/shadowFavicon.png" alt="hush favicon" />

      </form>
    </div>
  )
}
