import axios from "axios";
import { useEffect, useState } from "react";

function useAuth(){

  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('access'));
  const [isAuthLoading, setIsAuthLoading] = useState(true);
    
    useEffect(() => {
        const checkLogin = async () => {
  
          try {
            // 1. 액세스 토큰을 사용하여 /my API 호출
            const response = await axios.get('http://localhost:8080/my', {
              headers: {
                'access': accessToken,
              },
            })
            
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
              setAccessToken(newAccessToken);
              localStorage.setItem("access", newAccessToken)
  
            } catch (error) {
              console.error('로그인 상태 확인 중 에러:', error);
              setAccessToken(null);
            } 
          } finally{
            setIsAuthLoading(false);
          }
        };
  
        checkLogin();
      }, []);

      return {accessToken, isAuthLoading}
}

export default useAuth;