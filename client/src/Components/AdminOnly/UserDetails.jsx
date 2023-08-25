import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { deleteUser, getUserById, updateUser } from '../../services/adminService';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

export default function UserDetails(props) {

  const navigate = useNavigate();

  const { userId } = props;
  const [user,setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);


  useEffect(() => {
    const fetchUser = async (userId) => {
      try {
        const response = await getUserById(userId);
        const fetchedUser = response.data.data;
        setUser(fetchedUser);
      } catch(error) {
        if (error.response) {
          console.log('We have an error:', error.response.data);
        } else {
          console.log('We have an error:', error.message);
        }
      }
    };
    fetchUser(userId);
  },[userId])


  const handleUpdate = async () => {
    try {
      const response = await updateUser(userId, user);
      const updatedUser = response.data.updated;
      setUser(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.log('Error updating user:', error.message);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
     await deleteUser(userId);
      navigate('/users');
  }

  return (
      <div className='UserDetails'>
        {
          !user
          ? <div>Loading user data, Please wait...</div>
          :  <React.Fragment>
          {isEditing ? (
            <div>
            <textarea
            className='titleInput'
              type='text'
              value={user.userName}
              onChange={(e) => setUser({ ...user, userName: e.target.value })}
            />
            <br />
            <textarea
            className='contentInput'
              type='text'
              value={user.email}
              onChange={(e) =>
                setUser({ ...user, email: e.target.value })
              }
            />
             <br />
            <textarea
            className='contentInput'
              type='text'
              value={user.role}
              onChange={(e) =>
                setUser({ ...user, role: e.target.value })
              }
            />
          </div>
          ) : (
            <React.Fragment>
             <div className='userName'>{user.userName}</div>
              <br/>
              <div className='userEmail'>{user.email}</div>
              <br/>
              <div className='userPassword'>{user.password}</div>
              <br/>
              <div className='userRole'>{user.role}</div>
              <br/><hr/><br/>
            </React.Fragment>
          )}

           <ProtectedRoute allowedRoles={['admin']}>
            
              <div>
                <button onClick={handleDelete}>🗑️<br/>Delete</button>
                {isEditing ? (
                  <button onClick={handleUpdate}>Update</button>
                ) : (
                  <button onClick={handleEditToggle}><br/>Edit</button>
                )}
              </div>
              <br/><hr/><br/>
            </ProtectedRoute>

        </React.Fragment>
        }
      </div>
  )
}

