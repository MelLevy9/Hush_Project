import './SearchPost.css'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function SearchPost() {

    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState('');
  
    const handleSearch = () => {
        navigate(`/search/${searchQuery}`);
    };
  
    return (
      <div>
        <input
          type="text"
          placeholder="Search by title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className='searchButton' onClick={handleSearch}>Search</button>
      </div>
    );
}
