import axios from "axios";
import { useEffect, useState } from "react";
import { RootState } from "../store/store";
import { useSelector, useDispatch } from "react-redux";
import { setAccessToken, setIsAuthLoading } from "../store/authSlice";

function useAuth(){
  console.log("useAuth 실행")
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  // const isAuthLoading = useSelector((state: RootState) => state.auth.isAuthLoading);
  const dispatch = useDispatch();
  // const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('access'));
  // const [isAuthLoading, setIsAuthLoading] = useState(true);
    
    useEffect(() => {
        const checkLogin = async () => {
          dispatch(setIsAuthLoading(true));
          try {
            if(!accessToken){
              // setIsAuthLoading(false);
              // return {accessToken, isAuthLoading}
              return ;
            }
            // 1. 액세스 토큰을 사용하여 /isLogin API 호출
            const response = await axios.get('http://localhost:8080/isLogin', {
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

              await axios.get('http://localhost:8080/isLogin', {
                headers: {
                  'access': newAccessToken,
                },
              });
              // setAccessToken(newAccessToken);
              dispatch(setAccessToken(newAccessToken));
              localStorage.setItem("access", newAccessToken)
  
            } catch (error) {
              console.error('로그인 상태 확인 중 에러:', error);
              // setAccessToken(null);
              dispatch(setAccessToken(null));
              localStorage.removeItem('access');
            } 
          } finally{
            // setIsAuthLoading(false);
            dispatch(setIsAuthLoading(false));
          }
          
        };
  
        checkLogin();
      }, [accessToken]);

      // return {accessToken, isAuthLoading}
}

export default useAuth;