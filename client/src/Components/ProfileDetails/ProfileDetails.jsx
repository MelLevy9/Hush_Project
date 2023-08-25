import './ProfileDetails.css';
import React, { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import UserPostsList from '../UserPostsList/UserPostsList';
import CreateGroup from '../AdminOnly/CreateGroup';
import CreateUser from '../AdminOnly/CreateUser';
import { Link } from 'react-router-dom';
import UserGroupsList from '../UserGroupsList/UserGroupsList';


export default function ProfileDetails() {

  const { userData, signOut } = useContext(AuthContext);

  return (
    <React.Fragment>
    <ProtectedRoute allowedRoles={['user']}>
      <div className='ProfileDetails'>
        { userData
          ? <React.Fragment>
              <div className='row name'>Hello {userData.userName} !</div>
              <div className='signout' onClick={()=>signOut()}>Sign Out</div>
              <br/><hr/><br/>
              <div className='row'>Your favorite groups:</div>
              <UserGroupsList/>
              <br/><hr/><br/>
              <div className='row'>Your posts :</div>
              <UserPostsList/>
            </React.Fragment>
          : 'Something went wrong...'
        }
      </div>
    </ProtectedRoute>
    <ProtectedRoute allowedRoles={['admin']}>
      <div className='ProfileDetails'>
        { userData
          ? <React.Fragment>
              <div className='row name'>Hello {userData.userName} !</div>
              <br/>
              <div className='signout' onClick={()=>signOut()}>Sign Out</div>
              <hr/><br/>
              <div className='row plus'>Your Controllers :</div>
              <div className='adminBtn'><CreateUser/></div>
              <div className='adminBtn'><CreateGroup/></div>
              <div className='AllUsersBtn'><Link to="/users">👥 | &nbsp; List of All Users</Link></div>
              <br/>
              <br/><hr/><br/>
              <div className='row'>Your posts :</div>
              <UserPostsList/>
            </React.Fragment>
          : 'Something went wrong...'
        }
      </div>
    </ProtectedRoute>

    </React.Fragment>
  )
}
