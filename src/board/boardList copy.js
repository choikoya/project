import React from 'react';
import { Link } from 'react-router-dom';
import './boardList.css';

const BoardList = () => {
  // 게시글 데이터 예시
  const posts = [
    { id: 1, username: 'user1', title: '첫 번째 게시글', createdAt: '2024-08-10' },
    { id: 2, username: 'user2', title: '두 번째 게시글', createdAt: '2024-08-11' },
    { id: 3, username: 'user3', title: '세 번째 게시글', createdAt: '2024-08-12' },
    { id: 4, username: 'user4', title: '네 번째 게시글', createdAt: '2024-08-13' },
    { id: 5, username: 'user5', title: '다섯 번째 게시글', createdAt: '2024-08-14' },
    { id: 6, username: 'user6', title: '여섯 번째 게시글', createdAt: '2024-08-15' },
    { id: 7, username: 'user7', title: '일곱 번째 게시글', createdAt: '2024-08-16' },
    { id: 8, username: 'user8', title: '여덟 번째 게시글', createdAt: '2024-08-17' },
    { id: 9, username: 'user9', title: '아홉 번째 게시글', createdAt: '2024-08-18' },
    { id: 10, username: 'user10', title: '열 번째 게시글', createdAt: '2024-08-19' },
  ];

  return (
    <div className="board-container">
      <h1 className="board-title">게시판</h1>

      <div className="board-actions">
        <Link to="/create">
          <button className="board-button">글쓰기</button>
        </Link>
      </div>

      <table className="board-table">
        <thead>
          <tr>
            <th className="board-th">순서</th>
            <th className="board-th">제목</th>
            <th className="board-th">작성자</th>
            <th className="board-th">작성일자</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr key={post.id} className="board-tr">
              <td className="board-td">{index + 1}</td>
              <td className="board-td">
                <Link to={`/board/edit/${post.id}`} className="board-link">
                  {post.title}
                </Link>
              </td>
              <td className="board-td">{post.username}</td>
              <td className="board-td">{post.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="board-search">
        <input type="text" placeholder="검색어를 입력하세요" className="board-search-input" />
        <button className="board-button">검색</button>
      </div>
    </div>
  );
};

export default BoardList;
