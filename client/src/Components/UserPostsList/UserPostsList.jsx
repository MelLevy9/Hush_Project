import './UserPostsList.css'
import React, { useEffect, useState, useContext } from 'react'
import { getMyPostList } from '../../services/postService';
import { AuthContext } from '../../context/authContext';
import { Link } from 'react-router-dom';

export default function UserPostsList() {

  const { userData } = useContext(AuthContext);
  const [userPosts,setUserPosts] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async (userData) => {
      try {
        const response = await getMyPostList(userData.id);
        const data = response.data.userPosts
        setUserPosts(data);
      } catch(error) {
        if (error.response) {
          console.log('We have an error:', error.response.data);
        } else {
          console.log('We have an error:', error.message);
        }
      }
    };
    fetchUserPosts(userData);
  },[userData])

  return (
    <div className='userPosts'>
      {
        userPosts.length === 0 
        ? 'No Posts Found'
        : <React.Fragment>
            <ul>
              {
                userPosts.map((post) => (
                  <Link key={post._id} to={`/posts/${post._id}`}>
                    <li className='userPost'>
                      <div className='title'>{post.title}</div><hr/>
                      <div className='bodyText'>{post.bodyText}</div>
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