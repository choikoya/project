// Modal.js

import './modal.css'; // 모달 스타일을 위한 CSS 파일
import { useState, useEffect } from 'react';
import StarRating from './starRating';



const Modal = ({ isOpen, onClose, imgUrl, title, content, info }) => {
    
    const [rating, setRatings] = useState(0);
    const [averageRating, setAverageRating] = useState(0);
    
    useEffect(() => {
        if (isOpen) {
            // 서버에서 평균 별점 가져오기
            const fetchAverageRating = async () => {
                try {
                    const response = await fetch('/api/ratings/average', { // 평균 별점을 가져오는 API 엔드포인트
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    const data = await response.json();
                    setAverageRating(data.averageRating); // 평균 별점 업데이트
                } catch (error) {
                    console.error('Error fetching average rating:', error);
                }
            };

            fetchAverageRating();
        }
    }, [isOpen]);

   

    // 별점 업데이트 핸들러
    const handleRating = async(ratingValue) => {
        
        setRatings(ratingValue); // UI에서 별점 업데이트

    
         // Send the rating to the backend
         try {
            await fetch('http://192.168.0.130:8080/api/foodRatings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    food_name:title, // 또는 다른 식별자
                    rating:ratingValue, // 사용자로부터 받은 별점
                }),
            });
         // 별점 등록 후 평균 별점을 다시 가져와서 업데이트
         const response = await fetch('/api/ratings/average', { // 평균 별점을 가져오는 API 엔드포인트
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        setAverageRating(data.averageRating); // 평균 별점 업데이트
    } catch (error) {
        console.error('Error sending rating to backend:', error);
    }
};



    if (!isOpen) return null;

    console.log(info);

     // RCP_MANUAL 문자열을 줄바꿈으로 분리
     const manualSteps = info.RCP_MANUAL.split('\n').map((step, index) => (
        <li key={index}>{step}</li>
    ));

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>X</button>
                <h2 className="modal-title">{title}</h2>
                <hr className="divider" />
                <div className='modal-body'>
                    <div className="modal-left">
                        <img className="modal-image" src={imgUrl} alt={title} />
                    </div>
                    <div className="modal-right">
                        <div className="modal-ingredients">
                            <h3>재료 정보</h3>
                            <p>{content}</p>
                        </div>
                        <hr className="divider" />
                        <div className="modal-nutrition">
                            <h3>영양 정보</h3>
                            <p>중량 (1인분): {info.INFO_WGT}</p>
                            <p>열량: {info.INFO_ENG}</p>
                            <p>탄수화물: {info.INFO_CAR}</p>
                            <p>단백질: {info.INFO_PRO}</p>
                            <p>지방: {info.INFO_FAT}</p>
                            <p>나트륨: {info.INFO_NA}</p>
                        </div>

                    </div>
                </div>
                <hr className="divider" />
                <div className="modal-method">
                    <h3>조리 방법</h3>
                    <ul>
                        {manualSteps}
                    </ul>
                    
                </div>
                <hr className="divider" />
                <div className="modal-rating">
                    {/* <h3>별점 평가</h3> */}
                    <div className="starRating">
                        {/* /<p>등록한 별점: {rating}</p> */}
                        <div className="star-rating">
                            {[...Array(5)].map((_, index) => (
                                <svg
                                    key={index}
                                    className={`w-6 h-6 cursor-pointer ${
                                        index + 1 <= rating ? 'text-yellow-500' : 'text-gray-300'
                                    }`}
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    onClick={() => handleRating(index + 1)}
                                >
                                    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.956 1.429 8.322L12 18.905l-7.365 4.679 1.429-8.322L.001 9.306l8.331-1.151z" />
                                </svg>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
