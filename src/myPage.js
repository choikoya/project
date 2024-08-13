const MyPage = ({ favorites }) => {
    return (
        <div>
            <h2>즐겨찾기한 레시피</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {favorites.map((item, index) => (
                    <div key={index} className="card">
                        <img src={item.imgUrl} alt={item.title} />
                        <h3>{item.title}</h3>
                        <p>{item.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyPage;