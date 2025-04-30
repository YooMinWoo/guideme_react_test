import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import MyPage from './components/MyPage';
import MainPage from './components/MainPage';
import useAuth from './hooks/useAuth';
import GuideList from './components/GuideList';

function App() {
  useAuth();
  
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/my" element={<MyPage />} />
          <Route path="/guides" element={<GuideList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
