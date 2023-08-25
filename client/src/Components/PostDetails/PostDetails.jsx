import './PostDetails.css'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { deletePost, getPostById, updatePost } from '../../services/postService';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

export default function PostDetails(props) {

  const navigate = useNavigate();

  const { postId } = props;
  const [post,setPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchPost = async (postId) => {
      try {
        const response = await getPostById(postId);
        const fetchedPost = response.data.data;
        setPost(fetchedPost);
      } catch(error) {
        if (error.response) {
          console.log('We have an error:', error.response.data);
        } else {
          console.log('We have an error:', error.message);
        }
      }
    };
    fetchPost(postId);
  },[postId])

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdate = async () => {
    try {
      const response = await updatePost(postId, post);
      const updatedPost = response.data.updated;
      setPost(updatedPost);
      setIsEditing(false);
    } catch (error) {
      console.log('Error updating post:', error.message);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
     await deletePost(postId);
      navigate('/');
  }

  return (
      <div className='PostDetails'>
        {
          !post
          ? <div>Loading post data, Please wait...</div>
          :  <React.Fragment>
          {isEditing ? (
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
            <React.Fragment>
              <div className='postTitle'>{post.title}</div>
              <br />
              <hr />
              <div className='bodyText'>{post.bodyText}</div>
              <br />
            </React.Fragment>
          )}
          <ProtectedRoute allowedRoles={['admin']}>
            <hr />
            <div>
              <button onClick={handleDelete}>🗑️</button>
              {isEditing ? (
                <button onClick={handleUpdate}>Update</button>
              ) : (
                <button onClick={handleEditToggle}>Edit</button>
              )}
            </div>
          </ProtectedRoute>
        </React.Fragment>
        }
      </div>
  )
}
