import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context';
import MyButton from '../button/MyButton';


const Navbar = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)

    const logout = () => {
        setIsAuth(false)
        localStorage.removeItem('auth')
    }

    return (
        <div className='navbar'>
            <MyButton style={{marginRight: 20}} onClick={logout}>
                Выйти
            </MyButton>
            <div className='navbar__links'>
                <Link className='navbar__link' to='/about'>О сайте</Link>
                <Link className='navbar__link' to='/posts'>Посты</Link>
                <Link className='navbar__link' to='/posts-dinamic'>Динамические Посты</Link>
            </div>
        </div>
    )
}

export default Navbar;
