// RecipeInfo.js
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


const RecipeInfo = () => {
    const { id } = useParams(); // URL에서 id를 가져옵니다
    const [recipe, setRecipe] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await fetch(`http://192.168.0.130:8080/api/recipe/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setRecipe(data);
                setError('');
            } catch (err) {
                setError('Error fetching recipe details');
            }
        };

        fetchRecipe();
    }, [id]);

    return (
        <div className="recipe-info">
            {error && <p className="error">{error}</p>}
            {recipe ? (
                <div>
                    <h1>{recipe.DESC_KOR}</h1>
                    <img src={recipe.imageUrl} alt={recipe.DESC_KOR} />
                    <p>{recipe.description}</p>
                    {/* 기타 상세 정보 */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default RecipeInfo;