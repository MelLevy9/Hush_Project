import React from 'react'
import UserDetails from '../Components/AdminOnly/UserDetails'
import './Page.css'
import { useParams } from 'react-router-dom'

export default function UserDetailsPage() {
  const { userId } = useParams();
  return (
    <div className='UserDetails Page'>
      <UserDetails userId={userId}/>
      </div>
  )
}
