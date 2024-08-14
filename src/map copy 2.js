
//react-kakao-maps-sdk 라이브러리 사용

/*global kakao*/
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const KakaoMap = () => {
  return (
    <Map 
      center={{ lat: 37.365264512305174, lng: 127.10676860117488 }} 
      style={{ width: "500px", height: "400px" }}
      level={3}
    >
      <MapMarker position={{ lat: 37.365264512305174, lng: 127.10676860117488 }}>
        <div style={{color:"#000"}}>Here is the marker!</div>
      </MapMarker>
    </Map>
  );
}

export default KakaoMap;