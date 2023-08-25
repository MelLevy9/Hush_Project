import { useParams } from 'react-router-dom';
import { searchPosts } from '../../services/postService';
import './SearchPost.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function FoundPost() {
  const { search } = useParams();

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const foundPosts = async () => {
      try {
        const response = await searchPosts(search);
        const data = response.data.data;
        setSearchResults(data);
      } catch (error) {
        console.log('Error searching:', error.message);
      }
    };
    foundPosts();
  }, [search]);

  return (
    <div className='AllPosts'>
      <div className='pageTitle'>Search Results for '{search}' :</div>
      <hr /><br />
      {searchResults.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul>
          {searchResults.map((post) => (
            <Link key={post._id} to={`/posts/${post._id}`}>
              <li key={post._id}>{post.title}</li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}
