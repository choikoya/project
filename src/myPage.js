import React, { useState, useEffect } from 'react';
import './myPage.css'; // CSS 스타일 파일
import Calendar from 'react-calendar'; // 설치가 필요할 수 있습니다 (npm install react-calendar)
import 'react-calendar/dist/Calendar.css'; // CSS 스타일 파일
import { useNavigate } from 'react-router-dom'; // 회원 탈퇴를 위한 라우터 기능

const MyPage = () => {
    const [favorites, setFavorites] = useState([]); // 즐겨찾기 레시피 목록
    const [date, setDate] = useState(new Date()); // 달력 날짜 상태
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
    const resultsPerPage = 10; // 페이지당 결과 수
    const navigate = useNavigate(); // 회원 탈퇴 후 리다이렉션을 위한 네비게이션

    useEffect(() => {
        // API 호출 로직 추가 (여기서는 예제 데이터 사용)
        setFavorites([
            { title: '레시피 1' },
            { title: '레시피 2' },
            { title: '레시피 3' },
            { title: '레시피 4' },
            { title: '레시피 5' },
          
        ]);
    }, []);

    const handleDateChange = (newDate) => {
        setDate(newDate);
    };

    const handleDeleteAccount = () => {
        // 회원 탈퇴 처리 로직 추가
        console.log('회원 탈퇴');
        // 회원 탈퇴 후 리다이렉션
        navigate('/login'); // 로그인 페이지로 리다이렉션 (필요에 따라 수정)
    };

    // 페이지당 표시할 항목 계산
    const indexOfLast = currentPage * resultsPerPage;
    const indexOfFirst = indexOfLast - resultsPerPage;
    const currentFavorites = favorites.slice(indexOfFirst, indexOfLast);

    // 페이지 번호 클릭 핸들러
    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(favorites.length / resultsPerPage);

    return (
        <div className="my-page">
            <h1>My Page</h1>

            <div className="section">
                <h2>즐겨찾기한 레시피 목록</h2>
                <div className="favorites-list">
                    {currentFavorites.length > 0 ? (
                        currentFavorites.map((item, index) => (
                            <div key={index} className="favorite-item">
                                <p>{item.title}</p>
                            </div>
                        ))
                    ) : (
                        <p>즐겨찾기한 레시피가 없습니다.</p>
                    )}
                </div>
                {totalPages > 1 && (
                    <div className="pagination">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handlePageClick(index + 1)}
                                className={currentPage === index + 1 ? 'page-button active' : 'page-button'}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="section">
                <h2>달력</h2>
                <div className="calendar-container">
                    <Calendar
                        onChange={handleDateChange}
                        value={date}
                    />
                </div>
            </div>

            <div className="section">
                <button className="delete-account-btn" onClick={handleDeleteAccount}>
                    회원 탈퇴
                </button>
            </div>
        </div>
    );
};

export default MyPage;
