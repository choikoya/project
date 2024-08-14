import { useState, useEffect } from "react";
import './map.css';

export default function KakaoMap() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [activeOverlay, setActiveOverlay] = useState(null); //현재 활성화된 오버레이

  //페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // 페이지당 표시할 항목 수

  useEffect(() => {
    // 카카오 맵 API 스크립트 생성
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAOMAP_KEY}&autoload=false`;
    script.async = true;

    // 스크립트 로드 후 실행될 콜백 함수
    script.onload = () => {
      if (window.kakao && window.kakao.maps) {
        // 카카오 API가 로드되면 실행
        window.kakao.maps.load(() => {
          const container = document.getElementById("map");
          const options = {
            center: new window.kakao.maps.LatLng(35.237220, 129.087217),
            level: 3,
          };
          const newMap = new window.kakao.maps.Map(container, options);
          setMap(newMap);

          //  // 마커 생성 및 추가
          //  const markerPosition = new window.kakao.maps.LatLng(33.450701, 126.570667);
          //  const marker = new window.kakao.maps.Marker({
          //    position: markerPosition,
          //    map: map,
          //    title: 'My Marker'
          //  });

          //  // 커스텀 마커 디자인
          //  const customOverlay = new window.kakao.maps.CustomOverlay({
          //    position: markerPosition,
          //    content: '<div class="marker">M</div>',
          //    yAnchor: 1,
          //  });
          //  customOverlay.setMap(map);

          // 예시: 초기 검색 결과 추가
          // setSearchResults([
          //   { id: 1, name: "Place 1", lat: 33.450701, lng: 126.570667 },
          //   { id: 2, name: "Place 2", lat: 33.451701, lng: 126.571667 },
          // ]);

          // 지도 클릭 시 CustomOverlay 숨기기
          window.kakao.maps.event.addListener(newMap, 'click', () => {
            if (activeOverlay) {
              activeOverlay.setMap(null);
              setActiveOverlay(null);
            }
          });
        });
      } else {
        console.error("Kakao object not found");
      }
    };

    // 스크립트를 문서의 head에 추가
    document.head.appendChild(script);

    // 컴포넌트 언마운트 시 스크립트 제거
    return () => {
      document.head.removeChild(script);
    };
  }, [activeOverlay]);

  useEffect(() => {
    if (!map) return;

    // 기존 마커를 제거

    markers.forEach(marker => marker.setMap(null));

    // 검색 결과로 마커 추가
    const newMarkers = searchResults.map(result => {
      const position = new window.kakao.maps.LatLng(result.lat, result.lng);
      const marker = new window.kakao.maps.Marker({
        position: position,
        map: map,
        title: result.name,
      });



      // CustomOverlay 생성
      const overlayContent = `
        <div class="custom-overlay">
          <div class="overlay-header">${result.name}</div>
          <div class="overlay-address">주소: ${result.add}</div>
          <div class="overlay-tel">전화번호: ${result.tel}</div>
        </div>
      `;
      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: position, // 마커보다 약간 위에 표시되도록 위치 조정,
        content: overlayContent,
        yAnchor: 1.5,// 마커와 겹치지 않도록 yAnchor 조정
      });

      // 마커 클릭 시 CustomOverlay 표시
      window.kakao.maps.event.addListener(marker, 'click', () => {
        if (activeOverlay === customOverlay) {
          // 이미 클릭된 마커에 대해 작업하지 않음
          return;
        }
        if (activeOverlay) {
          activeOverlay.setMap(null);// 기존 오버레이를 지도에서 제거
        }
        
        customOverlay.setMap(map);// 클릭한 마커에 대한 새로운 오버레이를 지도에 표시
         setActiveOverlay(customOverlay);// 현재 활성화된 오버레이를 업데이트
      });



      // 마커 클릭 시 장소 정보 출력(대신 CustomOverlay표시)
      // window.kakao.maps.event.addListener(marker, 'click', () => {
      //   alert(result.name);
      // });

      return marker;
    });

    // 새로운 마커 상태 업데이트
    setMarkers(newMarkers);

    // 지도 중심을 검색 결과의 첫 번째 위치로 이동 (단, 활성화된 오버레이가 없는 경우에만) (선택 사항)
    // if (newMarkers.length > 0 && !activeOverlay) {
    //   map.setCenter(new window.kakao.maps.LatLng(searchResults[0].lat, searchResults[0].lng));
    // }
    }, [searchResults, map, activeOverlay]);


    const handleSearch = async (e) => {
      e.preventDefault();
      // 검색어로 결과를 필터링하는 로직을 여기에 추가할 수 있습니다.
      // 여기서는 예시로 필터링 없이 모든 결과를 보여줍니다.

      if (searchTerm === '') {
        alert('키워드를 입력하세요');
        return;
      }

      try {
        const response = await fetch(`http://192.168.0.130:8080/api/restaurant?bsnsNm=${searchTerm}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);

        // 예시 데이터 구조: { id, name, lat, lng }
        const results = data.response.body.items.item.map((item, index) => ({

          id: index,
          name: item.bsnsNm, //업소명 : bsnsNm
          add: item.addrRoad,
          tel: item.tel,
          lat: item.lat,  //위도
          lng: item.lng, //경도
        }));
        setSearchResults(results);
        console.log(searchResults);
        // setCurrentPage(1); // 검색 시 첫 페이지로 리셋


      } catch (err) {
        console.error('Error fetching data:', err);
        setSearchResults([]);
      }
    };


    const handleChange = (e) => {
      setSearchTerm(e.target.value);
    };


    // 현재 페이지에 표시할 검색 결과 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentResults = searchResults.slice(indexOfFirstItem, indexOfLastItem);

    // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
      // console.log(pageNumbers);
    };

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(searchResults.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <>
        <h2>음식점 검색</h2>
        <div className="page-container">

          <div className="search-bar-container">
            <div className="search-bar">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleChange}
                />
                <button type="submit">검색</button>
              </form>
              <ul className="search-results">
                {currentResults.map(result => (
                  <li key={result.id} className="search-result-item">
                    <div className="result-name">{result.name}</div>
                    <div className="result-address">위치 : {result.add}</div>
                    <div className="result-tel">전화번호 : {result.tel}</div>
                  </li>
                ))}
              </ul>
              <div className="pagination">
                {pageNumbers.map(number => (
                  <button
                    key={number}
                    onClick={() => handlePageChange(number)}
                    className={currentPage === number ? 'active' : ''}
                  >
                    {number}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="map-container">
            <div id="map"></div>
          </div>
        </div>
      </>
    );
  }
