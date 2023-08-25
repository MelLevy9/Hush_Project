import './AllPosts.css'
import React, { useEffect, useState } from 'react'
import { getAllPosts } from '../../services/postService';
import { Link } from 'react-router-dom';

export default function AllPosts({postsPerPage}) {

  const [posts,setPosts] = useState(null);
  const [page,setPage] = useState(1);
  const [nextPage,setNextPage] = useState(null);
  const [prevPage,setPrevPage] = useState(null);

  useEffect(() => {
    const fetchAllPosts = async () => {
      const response = await getAllPosts(page);

      setPage(response.data.page);
      setPrevPage(response.data.prevPage);
      setNextPage(response.data.nextPage);
      
      const postsArray = response.data.data;
      setPosts(postsArray);
    };
    fetchAllPosts(page);
  },[page])

  return (
    <div className='AllPosts'>
      {
        !posts 
        ? 'Loading posts, Please wait ...'
        : <React.Fragment>

            <button className='pageButton' disabled={!prevPage?true:false} onClick={()=>setPage(prevPage)}>«</button>
            <div className='pageNum'>{page}</div>
            <button className='pageButton' disabled={!nextPage?true:false} onClick={()=>setPage(nextPage)}>»</button>
            <br/><br/><br/>
            
            <ul>
              {
                posts.map((post) => (
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
