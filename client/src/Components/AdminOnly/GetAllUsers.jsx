import './AdminOnly.css'
import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../../services/adminService';
import { Link } from 'react-router-dom';

export default function AllUsers() {

  const [users,setUsers] = useState(null);

  useEffect(() => {
    const fetchAllUsers = async () => {
      const response = await getAllUsers();
      const usersArray = response.data;
      setUsers(usersArray);
    };
    fetchAllUsers();
  },[])

  return (
    <div className='AllUsers'>
      {
        !users 
        ? 'Loading users, Please wait ...'
        : <React.Fragment>

            <ul>
              {
                users.map((user) => (
                  <Link key={user._id} to={`/users/${user._id}`}>
                    <li>
                      <div className='userName'>👤 | &nbsp;&nbsp; {user.userName}</div>
                    </li>
                  </Link>
                ))
              }
            </ul>

          </React.Fragment>
      }
    </div>
  )
}
