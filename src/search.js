
//사용자로부터 키워드를 입력받아 API를 통해 관련 이미지를 가져오고, 이를 개별 카드(searchCard)로 변환해 화면에 표시
//SearchCard를 클릭했을 때 selectedItem을 설정하도록 Search 컴포넌트를 수정

import { useState, useEffect } from 'react';
import './search.css';
import SearchCard from './searchCard';
import Modal from './modal';




const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]); //결과를 배열로 설정
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(9); // 현재 페이지 상태
    const resultsPerPage = 9; // 페이지당 표시할 결과 수
    const [totalCount, setTotalCount] = useState('');
    const [selectedItem, setseletedItem] = useState(null);

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
            const rcpnmResults = data.COOKRCP01.row.map(item => ({
                ATT_FILE_NO_MAIN: item.ATT_FILE_NO_MAIN, //이미지 URL
                RCP_NM: item.RCP_NM, //레시피 이름
                RCP_PARTS_DTLS: item.RCP_PARTS_DTLS, //재료 정보
                RCP_WAY2: item.MANUAL01, //조리 방법
                INFO_WGT: item.INFO_WGT, //중량
                INFO_ENG: item.INFO_ENG, //열량
                INFO_CAR: item.INFO_CAR, //탄수화물
                INFO_PRO: item.INFO_PRO, //단백질
                INFO_FAT: item.INFO_FAT, //지방
                INFO_NA: item.INFO_NA //나트륨



            }));
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


    // 페이지 수 계산
    const totalPages = Math.ceil(totalCount / resultsPerPage);


    // 페이지 번호 클릭 핸들러
    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber * 9);
    };

    const handleCloseModal = ()=>{
        setseletedItem(null);
    };

    const handleCardClick = (item) => {
        setseletedItem(item);

    }
    

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
                            onClick={()=>handleCardClick(item)}
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
                        RCP_WAY2: selectedItem.MANUAL01,
                        INFO_WGT: selectedItem.INFO_WGT,
                        INFO_ENG: selectedItem.INFO_ENG,
                        INFO_CAR: selectedItem.INFO_CAR,
                        INFO_PRO: selectedItem.INFO_PRO,
                        INFO_FAT: selectedItem.INFO_FAT,
                        INFO_NA: selectedItem.INFO_NA
                    }}
                />
            )}

        </div>
    );
};

export default Search;