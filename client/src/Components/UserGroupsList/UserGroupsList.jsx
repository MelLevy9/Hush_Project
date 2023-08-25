import './UserGroupsList.css'
import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { getMyGroupList, deleteGroupFromList } from '../../services/groupListService';
import { AuthContext } from '../../context/authContext';
import { Link } from 'react-router-dom';
import { getGroupById } from '../../services/groupService';

export default function UserGroupsList() {

  const navigate = useNavigate();

  const { userData } = useContext(AuthContext);
  const [userGroups, setUserGroups] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchUserGroups = async (userData) => {
      try {
        const response = await getMyGroupList(userData.id);
        const data = response.data.data;

        const groupPromises = data.map(async (group) => {
          const response = await getGroupById(group.groupId);
          return response.data.data;
        });

        const groups = await Promise.all(groupPromises);

        setUserGroups(data);
        setGroups(groups);

      } catch (error) {
        if (error.response) {
          console.log('We have an error:', error.response.data);
        } else {
        console.log('We have an error:', error.message);
      }
    }
  };
  fetchUserGroups(userData);
}, [userData]);


const handleDelete = async (userGroupId) => {
  try {
    await deleteGroupFromList(userGroupId);
    window.location.reload();
    navigate('/profile');
  } catch (error) {
    console.error('Error deleting group:', error);
  }
}



return (
  <div className='userGroups'>
    {userGroups.length === 0 ? (
      'Your favorite groups list is empty'
    ) : (
      <React.Fragment>
        <ul>
          {userGroups.map((userGroup, index) => (
            <li className='userGroup' key={userGroup._id}>
              <div className='groupName'>
                <Link to={`/groups/${groups[index]._id}`}>
                  {groups[index].name}
                </Link>
                &nbsp; &nbsp; &nbsp; {' | '}
                &nbsp;
                <button
                  className='dltBtn'
                  onClick={() => handleDelete(userGroup._id)}
                >
                  ❌
                </button>
              </div>
            </li>
          ))}
        </ul>
      </React.Fragment>
    )}
  </div>
);


}



