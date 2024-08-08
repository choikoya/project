
export default function Card({ imgUrl, title, content, spTag }) {
    const sptags = (spTag.includes(',') ? spTag.split(',') : [spTag])
        .map(item =>
            <span className="inline-block bg-yellow-100 
                rounded-full px-3 py-1 text-sm font-semibold
                text-green-700 mr-2 mb-2"
                key={item}>
                {item}
            </span>
        );

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
            <img className="w-full" 
                src={imgUrl.includes('http:') ? 
                    imgUrl.replace('http:', 'https:') 
                    : imgUrl} 
                alt={title} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{title}</div>
                <p className="text-gray-700 text-base">
                    {content}
                </p>
            </div>
            <div className="px-6 pt-4 pb-2">
                {sptags}
            </div>
        </div>
    );
}