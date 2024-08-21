
//사용자로부터 키워드를 입력받아 API를 통해 관련 이미지를 가져오고, 이를 개별 카드(searchCard)로 변환해 화면에 표시
//SearchCard를 클릭했을 때 selectedItem을 설정하도록 Search 컴포넌트를 수정

import { useState, useEffect } from 'react';
import './search.css';
import SearchCard from './searchCard';
import Modal from './modal';
import Mypage from './myPage';
import { useLocation } from 'react-router-dom';
import AverageStarRating from './averageStarRating';




const Search = ({onSelectItem}) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]); //결과를 배열로 설정
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(9); // 현재 페이지 상태
    const resultsPerPage = 9; // 페이지당 표시할 결과 수
    const [totalCount, setTotalCount] = useState('');
    const [selectedItem, setseletedItem] = useState(null);
    const [favorites, setFavorites] = useState([]); //즐겨찾기 상태 추가
    const [ratingMap, setRatingMap] = useState({}); // 별점 데이터 저장


    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const recipeParam = queryParams.get('recipe');
        if (recipeParam) {
            const recipe = JSON.parse(decodeURIComponent(recipeParam));
            setQuery(recipe.RCP_NM); // 레시피 이름을 검색어로 설정
            handleSearch(recipe.RCP_NM); // 검색 수행
        }
    }, [location.search]);

    const handleSearch = async () => {
        //아무것도 입력안했을때 이렇게 키워드 입력하라는 경고메세지를 띄울건지, 전체 목록이 나오게 할건지 의논
        if (query === '') {
            alert('키워드를 입력하세요');
            return;
        }

        try {
            const response = await fetch(`http://192.168.0.130:8080/api/search?RCP_NM=${query}&startIdx=${currentPage - 8}&endIdx=${currentPage}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);

            //API로부터 필요한 데이터 추출
            const rcpnmResults = data.COOKRCP01.row.map(async(item) => {
                // 모든 MANUAL 필드를 수집
                const manuals = [];
                let manualIndex = 1;
                while (item[`MANUAL${manualIndex.toString().padStart(2, '0')}`]) {
                    manuals.push(item[`MANUAL${manualIndex.toString().padStart(2, '0')}`]);
                    manualIndex++;
                }

                // 각 레시피에 대한 평균 별점 가져오기
            const avgResponse = await fetch(`http://192.168.0.130:8080/api/getAverageRating?recipeName=${item.RCP_NM}`);
            const avgData = await avgResponse.json();
            const averageRating = avgData.averageRating || 0;

                return {

                    ATT_FILE_NO_MAIN: item.ATT_FILE_NO_MAIN, //이미지 URL
                    RCP_NM: item.RCP_NM, //레시피 이름
                    RCP_PARTS_DTLS: item.RCP_PARTS_DTLS, //재료 정보
                    RCP_MANUAL: manuals.join('\n'), //조리 방법
                    INFO_WGT: item.INFO_WGT, //중량
                    INFO_ENG: item.INFO_ENG, //열량
                    INFO_CAR: item.INFO_CAR, //탄수화물
                    INFO_PRO: item.INFO_PRO, //단백질
                    INFO_FAT: item.INFO_FAT, //지방
                    INFO_NA: item.INFO_NA, //나트륨
                    averageStarRating: averageRating // 평균 별점 설정

                };

                });
            console.log('검색결과', rcpnmResults);

            setTotalCount(data.COOKRCP01.total_count); //전체 결과 수 저장

            //100의 자리 올림

            setResults(rcpnmResults); //배열로 결과를 설정

            setError('');

        } catch (err) {
            setError('Error fetching data');
            setResults([]);
        }

    };

    const handleRatingSubmit = async (recipeName, rating) => {
        try {
            const response = await fetch('http://192.168.0.130:8080/api/submitRating', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ recipeName, rating }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit rating');
            }

            // 평균 별점을 업데이트
            const avgResponse = await fetch(`http://192.168.0.130:8080/api/getAverageRating?recipeName=${recipeName}`);
            if (!avgResponse.ok) {
                throw new Error('Failed to fetch average rating');
            }
            const avgData = await avgResponse.json();

            setRatingMap(prevMap => ({
                ...prevMap,
                [recipeName]: avgData.averageRating
            }));

        } catch (error) {
            console.error('Error handling rating:', error);
        }
    };

    // 페이지 수 계산
    const totalPages = Math.ceil(totalCount / resultsPerPage);


    // 페이지 번호 클릭 핸들러
    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber * 9);
    };

    const handleCloseModal = () => {
        setseletedItem(null);
    };

    const handleCardClick = (item) => {
        setseletedItem(item);
        if(onSelectItem) onSelectItem(item);

    };

    const handleFavorite = async(item) => {
        try {
            const token = sessionStorage.getItem('token'); // 'authToken'은 세션 스토리지에 저장된 토큰의 키입니다.

            if (!token) {
                console.error('No auth token found'); // **토큰이 없을 때 로그 추가**
                return;}

            const response = await fetch(`http://192.168.0.130:8080/favorite?recipeName=${item.RCP_NM}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                     'Authorization': `${token}`
                },
                body: JSON.stringify(item),
            });

            if (!response.ok) {
                throw new Error('Failed to save favorite');
            }

            setFavorites(prevFavorites => {
                const isFavorite = prevFavorites.some(favorite => favorite.RCP_NM === item.RCP_NM);
                if (isFavorite) {
                    return prevFavorites.filter(favorite => favorite.RCP_NM !== item.RCP_NM);
                } else {
                    return [...prevFavorites, item];
                }
            });
        } catch (error) {
            console.error('Error saving favorite:', error);
            
        }
        alert("저장완료");
    };


    useEffect(() => {
        if (results.length === 0) return;

        handleSearch();
    }, [currentPage]);

    useEffect(() => {
        console.log('Updated Results:', results);




    }, [results]);



    return (
        <div className="search-page">
            <h2>Recipe Search</h2>
            <div className="search-container">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter food name"
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            {error && <p className="error">{error}</p>}


            {results.length > 0 && (
                <div className="results results grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">

                    {results.map((item, index) => (



                        <SearchCard
                            key={index}
                            imgUrl={item.ATT_FILE_NO_MAIN} //이미지 소
                            title={item.RCP_NM} //레시피 이름
                            content={item.RCP_PARTS_DTLS} //재료
                            averageRating={item.averageRating} // 평균 별점 전달
                            onClick={() => handleCardClick(item)}
                            onFavorite={() => handleFavorite(item)} // 즐겨찾기 핸들러 전달
                            
                        />

                    ))}



                </div>

            )}



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


            {selectedItem && (
                <Modal
                    isOpen={!!selectedItem}
                    onClose={handleCloseModal}
                    imgUrl={selectedItem.ATT_FILE_NO_MAIN}
                    title={selectedItem.RCP_NM}
                    content={selectedItem.RCP_PARTS_DTLS}
                    info={{

                        INFO_WGT: selectedItem.INFO_WGT,
                        INFO_ENG: selectedItem.INFO_ENG,
                        INFO_CAR: selectedItem.INFO_CAR,
                        INFO_PRO: selectedItem.INFO_PRO,
                        INFO_FAT: selectedItem.INFO_FAT,
                        INFO_NA: selectedItem.INFO_NA,
                        RCP_MANUAL: selectedItem.RCP_MANUAL
                    }}
                />
            )}

        </div>
    );
};

export default Search;