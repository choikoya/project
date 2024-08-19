import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Comment = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    // 댓글을 가져옵니다.
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/posts/${postId}/comments`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8080/posts/${postId}/comments`, { content: comment });
      setComment('');
      // 댓글 목록을 새로고침
      const response = await axios.get(`http://localhost:8080/posts/${postId}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  return (
    <div>
      <h2>Comments</h2>
      <ul>
        {comments.map((cmt) => (
          <li key={cmt.id}>{cmt.content}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} required />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
};

export default Comment;
