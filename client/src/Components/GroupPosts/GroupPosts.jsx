import './GroupPosts.css'
import React, { useEffect, useState } from 'react'
import { getGroupPostsById } from '../../services/groupService';
import { Link } from 'react-router-dom';

export default function GroupPosts(props) {

  const { groupId } = props;
  const [groupPosts,setGroupPosts] = useState(null);

  useEffect(() => {
    const fetchGroup = async (groupId) => {
      try {
        const response = await getGroupPostsById(groupId);
        const fetchedGroup = response.data.data;
        setGroupPosts(fetchedGroup);
      } catch(error) {
        if (error.response) {
          console.log('We have an error:', error.response.data);
        } else {
          console.log('We have an error:', error.message);
        }
      }
    };
    fetchGroup(groupId);
  },[groupId])

  return (
      <div className='GroupPosts'>
        {
          !groupPosts
          ? <div>Loading group data, Please wait...</div>
          : <React.Fragment>
              <ul>
              {
                groupPosts.map((post) => (
                  <Link key={post._id} to={`/posts/${post._id}`}>
                    <li>
                      <div className='postTitle'>{post.title}</div>
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