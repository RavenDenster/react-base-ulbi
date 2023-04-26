import React, { useContext, useEffect, useState } from 'react';
import './styles/App.css';
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import About from './pages/About';
import Posts from './pages/Posts';
import Navbar from './components/UI/Navbar/Navbar';
import Error from './pages/Error';
import AppRouder from './components/AppRouter';
import { AuthContext } from './context';



function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [isLoading, setisLoading] = useState(true) // состояние закончился запрос или нет

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setIsAuth(true)
    }
    setisLoading(false)
  }, [])

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth,
      isLoading
    }}>
      <BrowserRouter>
        <Navbar />
        <AppRouder />
      </BrowserRouter>
    </AuthContext.Provider>
  )

}

export default App;
