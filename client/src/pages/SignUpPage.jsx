import React from 'react'
import SignUpForm from '../Components/SignUpForm/SignUpForm'


export default function SignUpPage() {
  return (
    <div className='SignUp Page'>
        <div className='pageTitle'>Please Sign Up :</div>
        <p>
          We recommend using an anonymous username, to get the most out of this platform
          <br />
          For example : ' user369 '
        </p>
        <SignUpForm/>
    </div>
  )
}
