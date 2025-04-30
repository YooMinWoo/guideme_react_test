import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function MainPage(){

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-sky-100 text-gray-800">
          <h1 className="text-4xl font-bold mb-4">GuideMe</h1>
          <p className="text-lg mb-6">당신의 여행에 꼭 맞는 가이드를 만나보세요</p>
          <div className="flex gap-4">
            <Link to="/guides" className="px-6 py-2 bg-sky-500 text-white rounded-xl hover:bg-sky-600">
              상품 보기
            </Link>
          </div>
        </div>
    )
}

export default MainPage;