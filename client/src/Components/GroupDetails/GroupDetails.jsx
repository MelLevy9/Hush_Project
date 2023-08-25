import './GroupDetails.css'
import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { deleteGroup, getGroupById, updateGroup } from '../../services/groupService';
import { addGroupToList } from '../../services/groupListService';
import { createPost } from '../../services/postService';
import { AuthContext } from '../../context/authContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import GroupPosts from '../GroupPosts/GroupPosts';

export default function GroupDetails(props) {

  const navigate = useNavigate();

  const { userData } = useContext(AuthContext);
  const { groupId } = props;
  const [group,setGroup] = useState(null);
  const [post,setPost] = useState({title: "write title here", bodyText: "write content here"});
  const [isWriting, setIsWriting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);


  useEffect(() => {
    const fetchGroup = async (groupId) => {
      try {
        const response = await getGroupById(groupId);
        const fetchedGroup = response.data.data;
        setGroup(fetchedGroup);
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

  const handleAddToList = async () => {
    try{
      const response = await addGroupToList(userData.id, groupId);
      return response;
    } catch (error) {
      if(error.response.status === 401){
        alert("This group is already in your list");
      } else {
      console.log('Error adding group:', error.message);
    }
    }
  };

  const handleCreate = async () => {
    const userId = userData.id;
    setIsWriting(true);
    const data = {
      userId,
      groupId,
      title: post.title,
      bodyText: post.bodyText
    }
    try{
      const response = await createPost(data);
      const createdPost = response.data.created;
      setPost(createdPost);
      setIsWriting(false);
    } catch (error) {
      console.log('Error creating post:', error.message);
    }
    
  }

  const handleWritingToggle = () => {
    setIsWriting(!isWriting);
  };

  const handleUpdate = async () => {
    try {
      const response = await updateGroup(groupId, group);
      const updatedGroup = response.data.updated;
      setGroup(updatedGroup);
      setIsEditing(false);
    } catch (error) {
      console.log('Error updating group:', error.message);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
     await deleteGroup(groupId);
      navigate('/');
  }

  return (
      <div className='GroupDetails'>
        {
          !group
          ? <div>Loading group data, Please wait...</div>
          :  <React.Fragment>
          {isEditing ? (
            <div>
              <textarea
              className='titleInput'
                type='text'
                value={group.name}
                onChange={(e) => setGroup({ ...group, name: e.target.value })}
              />
              <br />
              <textarea
              className='contentInput'
                type='text'
                value={group.description}
                onChange={(e) =>
                  setGroup({ ...group, description: e.target.value })
                }
              />
            </div>
          ) : (
            <React.Fragment>
             <div className='groupTitle'>{group.name}</div>
              <br/>
              <div className='groupDescription'>{group.description}</div>
              <br /><br />
              <ProtectedRoute allowedRoles={['user']}>
              <button className='addBtn' onClick={handleAddToList}>➕</button>
              </ProtectedRoute>
              <br/><hr/><br/>
            </React.Fragment>
          )}

           <ProtectedRoute allowedRoles={['user','admin']}>
              <div>
              {isWriting ? (
                  <button onClick={handleCreate}>Create Post</button>
                ) : (
                  <button onClick={handleWritingToggle}>📝🪶<br/>Write your post</button>
                )}
              </div>
            </ProtectedRoute>
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
            {isWriting ? (
                <div>
                  <textarea
                  className='titleInput'
                    type='text'
                    value={post.title}
                    onChange={(e) => setPost({ ...post, title: e.target.value })}
                  />
                  <br />
                  <textarea
                  className='contentInput'
                    type='text'
                    value={post.bodyText}
                    onChange={(e) =>
                      setPost({ ...post, bodyText: e.target.value })
                    }
                  />
                </div>
                ) : (
                  <p></p>
                )}
              <GroupPosts groupId={groupId}/>
            
        </React.Fragment>
        }
      </div>
  )
}

