import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

interface MyPageData {
    username: string,
    name: string,
    email: string,
    mobile: string,
}

function MyPage(){
    const history = useNavigate();
    // const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('access'))
    const {accessToken, isAuthLoading} = useAuth();
    const [loading, setLoading] = useState<boolean>(true); // 로딩 상태 관리
    const [error, setError] = useState<boolean>(false);
    // useAuth()
    const [myPage, setMyPage] = useState<MyPageData>({
        username : '',
        name : '',
        email : '',
        mobile : ''
    })
    

    useEffect(() => {
      if(isAuthLoading) return;
      const checkLogin = async () => {
        try {
          if (!accessToken) {
            console.log("액세스 토큰이 없습니다.!!!!!!!!!!!!!!!!!!@@@@@@@@@@@")
            throw new Error("액세스 토큰이 없습니다.");
          }
          // 1. 액세스 토큰을 사용하여 /my API 호출
          const response = await axios.get('http://localhost:8080/my', {
            headers: {
              'access': accessToken,
            },
          })
          setMyPage(response.data.data)

        } catch (error) {
          console.error('로그인 상태 확인 중 에러:', error);
          setError(true);
        } finally{
          setLoading(false);
        }
      };

      checkLogin();
    }, [isAuthLoading]);
    

    if (loading || isAuthLoading) {
        return <div>로딩 중...</div>; // 로딩 중인 경우 표시
    }

    if(error){
        return <div>에러 발생...</div>; // 로딩 중인 경우 표시
    }

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
          <h2>마이페이지</h2>
          <div style={{ marginBottom: '10px' }}>
            <strong>사용자명:</strong> {myPage.username}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>이름:</strong> {myPage.name}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>이메일:</strong> {myPage.email}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>전화번호:</strong> {myPage.mobile}
          </div>
        </div>
      );

}

export default MyPage;