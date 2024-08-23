import React, { useState } from 'react';
import './imgSearch.css'; // CSS 파일을 불러옵니다.

const ImageSearch = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState('');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setResult(''); // 새로운 파일 업로드 시 이전 결과 초기화
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (image) {
      const formData = new FormData();
      formData.append('file', image);

      try {
        // 서버로 이미지를 업로드하고 결과를 받아옵니다.
        const response = await fetch('http://192.168.0.130:5000/predict', { // 서버의 이미지 검색 엔드포인트를 지정하세요.
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('이미지 검색에 실패했습니다.');
        }

        const data = await response.json();

        setResult(` ${data.prediction}`);
        console.log("result",result);
        console.log("data",data);
      } catch (error) {
        setResult(`에러: ${error.message}`);
      }
    } else {
      setResult('이미지 파일을 선택하세요.');
    }
  };

  return (
    <div className="container">
      <h1>이미지 검색</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="imageUpload">이미지 파일 업로드:</label>
        <input 
          type="file" 
          id="imageUpload" 
          accept="image/*" 
          onChange={handleImageUpload} 
          required 
          className="input-file"
        />
        <button type="submit" className="btn">검색</button>
      </form>
      {result && <div id="result" className="result">{result.split(",").map((item,index)=>(
        index % 2 === 0 && 
        <li key={index}>{item}</li>
        ))}</div>}
    </div>
  );
};

export default ImageSearch;
