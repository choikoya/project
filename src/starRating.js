
import { useState } from "react";

export default function StarRating({ onRating }) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const handleClick = (ratingValue) => {
        setRating(ratingValue);
        onRating(ratingValue); // 부모 컴포넌트에 선택된 별점 전달
    };

    return (
        <div className="star-rating">
            {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;
                return (
                    <label key={index}>
                        <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            onClick={() => handleClick(ratingValue)}
                            className="hidden"
                        />
                        <svg
                            className={`w-6 h-6 cursor-pointer ${
                                ratingValue <= (hover || rating) ? 'text-yellow-500' : 'text-gray-300'
                            }`}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(0)}
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.956 1.429 8.322L12 18.905l-7.365 4.679 1.429-8.322L.001 9.306l8.331-1.151z" />
                        </svg>
                    </label>
                );
            })}
        </div>
    );
}
