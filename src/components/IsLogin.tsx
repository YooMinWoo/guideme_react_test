import React, { useEffect, useState } from "react";
import axios from "axios";

function IsLogin() {
  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('access'))

  useEffect(() => {
    const checkLogin = async () => {
      if (!accessToken) {
        // accessToken이 없으면 로그인 창으로 이동
        // history.push('/login');
        return;
      }

      try {
        // 1. 액세스 토큰을 사용하여 /my API 호출
        const callMy = await axios.get('http://localhost:8080/my', {
          headers: {
            'access': accessToken,
          },
        })

        if(callMy.status === 200) return;

        const callRefresh = await axios.post('http://localhost:8080/refresh',{
          withCredentials: true
        })
        if(callRefresh.status === 200){
          setAccessToken(callRefresh.data.accessToken);
        }
      } catch (error) {
        console.error('로그인 상태 확인 중 에러:', error);
        // history.push('/login');
      }
    };

    checkLogin();
  }, []);

  return null;
}

export default IsLogin;