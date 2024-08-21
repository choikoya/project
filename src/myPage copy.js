import React, { useState, useEffect } from 'react';
import './myPage.css'; // CSS 스타일 파일
import Calendar from 'react-calendar'; // 설치가 필요할 수 있습니다 (npm install react-calendar)
import 'react-calendar/dist/Calendar.css'; // CSS 스타일 파일
import { useNavigate } from 'react-router-dom'; // 회원 탈퇴를 위한 라우터 기능
import SearchCard from './searchCard';
import Search from './search';

const MyPage = () => {
    const [favorites, setFavorites] = useState([]); // 즐겨찾기 레시피 목록
    const [date, setDate] = useState(new Date()); // 달력 날짜 상태
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
    const [recipesByDate, setRecipesByDate] = useState({}); // 날짜별 레시피 목록
    const resultsPerPage = 10; // 페이지당 결과 수
    const navigate = useNavigate(); // 회원 탈퇴 후 리다이렉션을 위한 네비게이션
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [showSearch, setShowSearch] = useState(false); // Search 컴포넌트의 표시 여부


    useEffect(() => {
        // API 호출 로직 추가 (여기서는 예제 데이터 사용)
        const fetchFavorites = async () => {
            //     setFavorites([
            //     { title: '레시피 1' },
            //     { title: '레시피 2' },
            //     { title: '레시피 3' },
            //     { title: '레시피 4' },
            //     { title: '레시피 5' },

            // ]);
            try {
                const token = sessionStorage.getItem('token'); // 'authToken'은 세션 스토리지에 저장된 토큰의 키입니다.

                if (!token) {
                    console.error('No auth token found'); // **토큰이 없을 때 로그 추가**
                    return;

                }
                const response = await fetch('http://192.168.0.130:8080/favorite', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`, // 토큰을 Authorization 헤더에 추가합니다.
                    },
                  });

                 

                  if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                    const data =  await response.json();
                    
                    setFavorites(data);
                    console.log(data);
                } catch (error) {
                    console.error('Error fetching favorites:', error);
                }
            };
            fetchFavorites();
            console.log(currentFavorites)
            
        }, []);

        
        const handleRecipeClick = (recipe) => {
            navigate(`/search?query=${encodeURIComponent(recipe.title)}`);
        };
        


    useEffect(() => {
        // 날짜와 레시피 정보 API 호출
        const fetchRecipesByDate = async () => {
            try {
                const response = await fetch('/api/recipesByDate'); // 백엔드 API URL
                const data = await response.json();

                // data 예시: { '2024-08-21': [{ title: '레시피 1' }, { title: '레시피 2' }], ... }
                setRecipesByDate(data);
            } catch (error) {
                console.error('Error fetching recipes by date:', error);
            }
        };
        fetchRecipesByDate();
    }, []);

    // const handleDateChange = (newDate) => {
    //     setDate(newDate);
    //     console.log("선택된날짜:", newDate);
    // };

    const handleDeleteAccount = () => {
        // 회원 탈퇴 처리 로직 추가
        console.log('회원 탈퇴');
        // 회원 탈퇴 후 리다이렉션
        navigate('/login'); // 로그인 페이지로 리다이렉션 (필요에 따라 수정)
    };

    const handleCheck = (selectedDate, recipe) => {
        console.log(selectedDate);
        console.log(recipe);

        const formattedDate = selectedDate.toISOString().split('T')[0]; // 'YYYY-MM-DD' 형식으로 변환
        setRecipesByDate(prev => {
            const existingRecipes = prev[formattedDate] || [];
            return {
                ...prev,
                [formattedDate]: [...existingRecipes, recipe]
            };
        });
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

    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const formattedDate = date.toISOString().split('T')[0]; // 'YYYY-MM-DD' 형식으로 변환
            const recipes = recipesByDate[formattedDate] || [];
            return (
                <div className="recipe-tile">
                    {recipes.map((recipe, index) => (
                        <div key={index} className="recipe-tile-content">
                            <p>{recipe.title}</p>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
        
    };

    return (
        <div className="my-page">
            <h2>My Page</h2>

            <div className="section">
                <h2>즐겨찾기한 레시피 목록</h2>
                <div className="favorites-list">
                    
                    {currentFavorites.length > 0 ? (
                        currentFavorites.map((item, index) => (
                            <div key={index} className="favorite-item"  onClick={() => handleRecipeClick(item)}>
                                <p>{item}</p>

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
                        onChange={setDate}
                        value={date}
                        tileContent={tileContent}
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
