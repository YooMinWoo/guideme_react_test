interface Guide {
    id: number;
    name: string;
    region: string;
    price: number;
    rating: number;
}

interface GuideCardProps {
    guide: Guide;
}

const GuideCard: React.FC<GuideCardProps> = ({ guide }) => {
    return (
      <div className="border rounded-xl shadow-md p-4 bg-white hover:shadow-lg transition-all">
        <h3 className="text-xl font-semibold">{guide.name}</h3>
        <p className="text-gray-600">{guide.region}</p>
        <p className="text-sm mt-1">가격: {guide.price.toLocaleString()}원</p>
        <p className="text-sm">평점: ⭐ {guide.rating}</p>
        <button className="mt-4 bg-sky-500 text-white py-1 px-3 rounded hover:bg-sky-600">
          자세히 보기
        </button>
      </div>
    );
  }
  
  export default GuideCard;
  