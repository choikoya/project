import React, { useState } from 'react';
import PostItem from './PostItem';
import SearchBar from './SearchBar';
import './PostList.css';

const POSTS_PER_PAGE = 20;

function PostList({ posts }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE, 
    currentPage * POSTS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  return (
    <div className="post-list">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="posts">
        {paginatedPosts.map(post => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
      <div className="pagination">
        <button 
          onClick={() => setCurrentPage(currentPage - 1)} 
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button 
          onClick={() => setCurrentPage(currentPage + 1)} 
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PostList;
