import { useState, useEffect } from 'react';
import './search.css';

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]); //결과를 배열로 설정
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
    const resultsPerPage = 30; // 페이지당 표시할 결과 수
    const [totalCount, setTotalCount] = useState('');

    const handleSearch = async () => {
        try {
            const response = await fetch(`http://192.168.0.130:8080/api/search?desc_kor=${query}&pageNo=${currentPage}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
            const descKorResults = data.body.items.map(item => item.DESC_KOR); //DESC_KOR 필드만 추출
            setTotalCount(data.body.totalCount); 

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
        setCurrentPage(pageNumber);
    };

    // totalPages가 바뀔 때마다 콘솔 로그를 찍는 useEffect 훅
    useEffect(() => {
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
                    <ul>
                        {results.map((desc_kor, index) => (
                            <li key={index}>
                                <h1>{desc_kor}</h1>
                                

                            </li>
                        ))}
                    </ul>
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