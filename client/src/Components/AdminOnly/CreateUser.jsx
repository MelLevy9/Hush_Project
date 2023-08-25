import React, { useState } from 'react'
import { createUser } from '../../services/adminService';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

export default function CreateUser() {

    const [user,setUser] = useState({userName: "", email: "", password: "", role: ""});
    const [isWriting, setIsWriting] = useState(false);
  
  
    const handleCreate = async () => {
      setIsWriting(true);
      const data = {
        userName: user.userName,
        email: user.email,
        password: user.password,
        role: user.role
      }
      try{
        const response = await createUser(data);
        const createdUser = response.data.created;
        setUser(createdUser);
        setIsWriting(false);
      } catch (error) {
        console.log('Error creating user:', error.message);
      }
      
    }
  
    const handleWritingToggle = () => {
      setIsWriting(!isWriting);
    };
  
    return (
        <div className='CreateUser'>

             <ProtectedRoute allowedRoles={['admin']}>
                <div>
                {isWriting ? (
                    <button onClick={handleCreate}>Create User</button>
                  ) : (
                    <button onClick={handleWritingToggle}>📝🪶<br/>Add a new user</button>
                  )}
                </div>
              </ProtectedRoute>
              {isWriting ? (
                  <div>
                    <label>User Name:</label><br />
                    <textarea
                    className='userInput'
                      type='text'
                      value={user.userName}
                      onChange={(e) => setUser({ ...user, userName: e.target.value })}
                    />
                    <br /><br />
                    <label>User Email:</label><br />
                    <textarea
                    className='userInput'
                      type='text'
                      value={user.email}
                      onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                      }
                    />
                     <br /><br />
                     <label>User Password:</label><br />
                    <textarea
                    className='userInput'
                      type='text'
                      value={user.password}
                      onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                      }
                    />
                     <br /><br />
                     <label>User Role:</label><br />
                    <textarea
                    className='userInput'
                      type='text'
                      value={user.role}
                      onChange={(e) =>
                        setUser({ ...user, role: e.target.value })
                      }
                    />
                  </div>
                  ) : (
                    <p></p>
                  )}

        </div>
    )
}
