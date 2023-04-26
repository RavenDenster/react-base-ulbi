import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import About from '../pages/About';
import Posts from '../pages/Posts';
import Error from '../pages/Error';
import PostIdPage from '../pages/PostidPage';
import Login from '../pages/Login';
import { AuthContext } from '../context';
import DinamicPosts from '../pages/DinamicPost';
import Loader from './UI/Loader/Loader';




const AppRouder = () => {

    const { isAuth, setIsAuth, isLoading } = useContext(AuthContext)  // мы помещаем функцию в перем. обориваем всё приложение и передаём провайдеру нужные значения. Далее перездаём эту штуку в нужный файл и используем useContext и используем дистр для value провяйдера 
    //console.log(isAuth);
    if(isLoading) {
        return <Loader/> // это своего рода заглушка и router не работает когда едёт авторизация и начинает работать только когда известно 
    }   
    return (
        isAuth
            ?
            <Routes>
                <Route path="/about" element={<About />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/posts-dinamic" element={<DinamicPosts />} />
                <Route path="/posts/:id" element={<PostIdPage />} />  {/* для того, что бы маршрут был диномическим нужно : и название параметра */}
                <Route path="*" element={<Navigate to="/posts"/>} />   {/* <Route path="*" element={<Error />} /> */}
            </Routes>
            :
            <Routes>
                <Route path="/login" element={ <Login/>} />
                 <Route path="*" element={<Navigate to="/login"/>} /> 
            </Routes>

    )
}

export default AppRouder;