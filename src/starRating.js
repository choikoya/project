
import './starRating.css';

const StarRating = ({averageRating})=>{
    return (
        <div className="star-rating flex space-x-1">
            {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;
                return (
                    <svg
                    key={index}
                    className={`w-6 h-6 ${
                        ratingValue <= averageRating ? 'text-yellow-500' : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.956 1.429 8.322L12 18.905l-7.365 4.679 1.429-8.322L.001 9.306l8.331-1.151z" />
                </svg>
                   
                );
            })}
            {averageRating !== undefined && averageRating > 0 && (
                <p className="average-rating">평균 별점: {averageRating.toFixed(1)}</p>
            )}

        </div>
    );
};

export default StarRating;
