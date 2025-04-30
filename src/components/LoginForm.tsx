import axios from "axios";
import { useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
// import { setAccessToken, setIsAuthLoading } from '../store/authSlice';
import { RootState } from '../store/store';
import { useSelector, useDispatch } from 'react-redux';
import { setAccessToken } from "../store/authSlice";

interface LoginData {
    username: string,
    password: string,
}

function LoginForm(){
    const accessToken = useSelector((state: RootState) => state.auth.accessToken);
    const isAuthLoading = useSelector((state: RootState) => state.auth.isAuthLoading);
    const dispatch = useDispatch();

    const history = useNavigate();

    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    // const {setAccessToken} = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(usernameRef.current && passwordRef.current){
            try {
                const response = await axios.post('http://localhost:8080/login', {
                    username: usernameRef.current.value,
                    password: passwordRef.current.value
                }, {
                  withCredentials: true
                });

                const {accessToken, refreshToken} = response.data.data;
                localStorage.setItem('access', accessToken);
                // alert('로그인이 완료되었습니다!');
                // setAccessToken(accessToken)
                dispatch(setAccessToken(accessToken))
                history("/")
            } catch (error) {
                alert('로그인에 실패했습니다.');
            }
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: '0 auto' }}>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>아이디:</label>
          <input
            type="text"
            name="username"
            ref = {usernameRef}
            required
          />
        </div>
        <div>
          <label>비밀번호:</label>
          <input
            type="password"
            name="password"
            ref = {passwordRef}
            required
          />
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
    )
}

export default LoginForm;