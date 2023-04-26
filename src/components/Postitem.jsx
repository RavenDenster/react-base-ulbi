import React from 'react';
import MyButton from './UI/button/MyButton';
import { useNavigate } from 'react-router-dom';

const Postitem = ({ number, post, remove }) => { // props это входные данные. По сути обычные аргументы функции
    //console.log(post)

    const router = useNavigate() // с помощью этого хука мы можем переходить на другие дстраницы без ссылок, использую другие способы например кнопки
    //console.log(router);

    return (
        <div className='post'>
            <div className='post__content'>
                <strong>{post.id}. {post.title}</strong>
                <div>
                    {post.body}
                </div>
            </div>
            <div className='post__btns'>
                <MyButton onClick={() => router(`/posts/${post.id}`)} >Открыть</MyButton>
                <MyButton onClick={() => remove(post)} >Удалить</MyButton>
            </div>
        </div>
    )
}

export default Postitem;
