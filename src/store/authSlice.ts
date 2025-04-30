// src/store/counterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    accessToken: string | null;
    isAuthLoading: boolean;
}

const initialState: AuthState = {
    accessToken: localStorage.getItem('access') || null,
    isAuthLoading: true,
};

// slice 만들기
const authSlice = createSlice({
    name: "auth", // 이름
    initialState: initialState,    // 초기값
    reducers: {
        setAccessToken: (state, action: PayloadAction<string | null>) => {
          state.accessToken = action.payload;
        },
        setIsAuthLoading: (state, action: PayloadAction<boolean>) => {
          state.isAuthLoading = action.payload;
        },
    },
});

// 액션 내보내기
export const { setAccessToken, setIsAuthLoading } = authSlice.actions;

// 리듀서 내보내기
export default authSlice.reducer;
