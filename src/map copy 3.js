/*global kakao*/
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function Kakaomap() {
  const [map, setMap] = useState(null);
  const [swNePosition, setSwNePosition] = useState();
  const [Sm, setSm] = useState(null);  // 초기값 null 설정
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [markerdata, setMarkerdata] = useState([]);
  const mapRef = useRef();

  const location = useLocation();

  useEffect(() => {
    // Window resize 이벤트 등록
    const resizeListener = () => {
      setInnerHeight(window.innerHeight);
    };
    window.addEventListener("resize", resizeListener);

    // 카카오 지도 스크립트 로드
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAOMAP_KEY}&autoload=false`;

    script.onload = () => {
      console.log("script loaded..")
      kakao.maps.load(() => {
        console.log("kakao map api loaded..")
        const container = mapRef.current;
        const options = {
          center: new kakao.maps.LatLng(35.2358704, 129.0768405),
          level: 4
        };
        const newMap = new kakao.maps.Map(container, options);
        setMap(newMap);
      });
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup
      document.head.removeChild(script);
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  return (
    <div className="w-full flex">
      {/* 카카오 지도 */}
      <div ref={mapRef} className="flex-grow" style={{ height: innerHeight - 73 }}></div>
      
      {/* 부가적인 정보 (여기에 다양한 데이터를 표시할 수 있습니다.) */}
      <div className="w-80" style={{ height: innerHeight - 73 }}>
        {Sm}
      </div>
    </div>
  );
}
