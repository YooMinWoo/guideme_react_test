import { useEffect } from "react";

function useAuth(accessToken:string){
    
    useEffect(() => {
        const checkLogin = async () => {
  
          try {
            if (!accessToken) {
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
            try {
              const response = await axios.post('http://localhost:8080/refresh',{},{
                withCredentials: true
              })
              const newAccessToken = response.data.data.accessToken;
  
              const retry = await axios.get('http://localhost:8080/my', {
                headers: {
                  'access': newAccessToken,
                },
              });
              setMyPage(retry.data.data);
  
  
            } catch (error) {
              console.error('로그인 상태 확인 중 에러:', error);
              setError(true);
            } finally{
              setLoading(false);
            }
          }
        };
  
        checkLogin();
      }, []);
}

export default useAuth;