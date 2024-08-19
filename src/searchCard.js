
//각각의 이미지와 그에 관련된 정보를 시각적으로 보기 좋게 표시하는 역할(카드 레이아웃 렌더링)
//SearchCard를 클릭했을 때 onClick 이벤트 핸들러를 호출하여 선택된 아이템을 Search 컴포넌트로 전달
import AverageStarRating from "./averageStarRating";
import { FaCalendarCheck } from 'react-icons/fa'; // 체크 모양 아이콘을 위해 react-icons 사용
import './searchCard.css';

export default function SearchCard({ imgUrl, title, content, averageRating, onClick, onFavorite, onCheck}) {
    

    // const handleRating = (ratingValue) => {
    //     console.log(`Rated: ${ratingValue} stars`);
    //     // 필요한 경우, 여기에 별점 데이터를 서버에 보내거나 상태에 저장하는 로직을 추가할 수 있습니다.
    // };

    // const handleCardClick = (event) => {
    //     // Ensure that the click event does not trigger if the click is on the buttons or star rating
    //     if (event.target.closest('.search-card-content')) {
    //         onClick();
    //     }
    // };

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 search-card" onClick={onClick}>
            <img className="w-full" 
                src={imgUrl.includes('http:') ? 
                    imgUrl.replace('http:', 'https:') : imgUrl} 
                alt={title} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{title}</div>
                
                {/* Content box with background color */}
                <div className="bg-yellow-200 p-4 rounded">
                    <p className="text-gray-700 text-base">{content}</p>
                </div>
                
                  {/* Action buttons */}
                <div className="mt-4 flex flex-col">
                    {/* Buttons in a horizontal row */}
                    <div className="flex mb-2">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                            onClick={(e) => {
                                e.stopPropagation();
                                onFavorite();
                            }}>
                            레시피저장
                        </button>

                        <div className="flex items-center">
                            <AverageStarRating averageRating={averageRating} />
                        </div>
                    </div>

                    {/* Calendar Check button below the horizontal buttons */}
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center"
                        onClick={(e) => {
                            e.stopPropagation();
                            onCheck();
                        }}>
                        <FaCalendarCheck className="mr-2" />
                        달력 체크
                    </button>
            </div>
            </div>
        </div>
    );
}

