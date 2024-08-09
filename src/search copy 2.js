
//사용자로부터 키워드를 입력받아 API를 통해 관련 이미지를 가져오고, 이를 개별 카드(searchCard)로 변환해 화면에 표시

import { useState, useEffect, useRef } from 'react';
import './search.css';
import searchCard from './searchCard';





const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]); //결과를 배열로 설정
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(9); // 현재 페이지 상태
    const resultsPerPage = 9; // 페이지당 표시할 결과 수
    const [totalCount, setTotalCount] = useState('');

    const handleSearch = async () => {
        
        try {
            const response = await fetch(`http://192.168.0.130:8080/api/search?RCP_NM=${query}&startIdx=${currentPage-8}&endIdx=${currentPage}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
            const descKorResults = data.COOKRCP01.row.map(item => item.RCP_NM); //DESC_KOR 필드만 추출
            setTotalCount(data.COOKRCP01.total_count); 

            //100의 자리 올림

            setResults(descKorResults); //배열로 결과를 설정
            setError('');
           
        } catch (err) {
            setError('Error fetching data');
            setResults([]);
        }

    };

  
    // 페이지 수 계산
    const totalPages = Math.ceil(totalCount / resultsPerPage);


    // 페이지 번호 클릭 핸들러
    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber*9);
    };

    // totalPages가 바뀔 때마다 콘솔 로그를 찍는 useEffect 훅
    useEffect(() => {
        if (results.length === 0) return;

        handleSearch();
    }, [currentPage]);
    

    return (
        <div className="search-page">
            <h2>recipe Search</h2>
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
                <div className="results">
                    
                        {results.map((RCP_NM, index) => (
                            <div key={index} className='card'>
                                <h1>{RCP_NM}</h1>
                                

                            </div>
                        ))}
                    
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
                </div>

            )}
        </div>
    );
};

export default Search;