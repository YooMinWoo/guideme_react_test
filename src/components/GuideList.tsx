import GuideCard from "./GuideCard";

const sampleGuides = [
    { id: 1, name: "김가이드", region: "서울", price: 50000, rating: 4.8 },
    { id: 2, name: "박가이드", region: "부산", price: 60000, rating: 4.5 },
  ];
  
  function GuideList() {
    return (
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6">가이드 목록</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sampleGuides.map((guide) => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>
      </div>
    );
  }
  
  export default GuideList;