import React from 'react';
import MyInput from './UI/input/MyInput';
import MyButton from './UI/button/MyButton';
import { useState } from 'react';

const PostForm = ({ create }) => {

    const [post, setPost] = useState({ title: '', body: '' }) // первый это состояние, вторая это функция для изменения состояния

    const addNewPost = (e) => {
        e.preventDefault()
        // console.log(title)
        // console.log(bodyInputRef.current.value)
        //setPosts2( [...posts2, {...post, id: Date.now()}]) // после запятой мы разворачиваем объект для создания нового
        //console.log(posts2);
        const newPost = {
            ...post, id: Date.now()
        }
        create(newPost) // мы не можем пользоваться пропсами от ребёнка к родителю/ и поэтому мы используем кол бэк функцию для передачи готового объекта в App
        setPost({ title: '', body: '' })
    }

    return (


        <form>
            <MyInput
                type='text'
                placeholder='название поста'
                value={post.title}
                onChange={e => setPost({ ...post, title: e.target.value })}  // post разворачивает все поля которые есть и изменяем нужное
            />

            <MyInput
                type='text'
                placeholder=' описание поста'
                value={post.body}
                onChange={e => setPost({ ...post, body: e.target.value })}
            // ref={bodyInputRef}
            />

            <MyButton onClick={addNewPost} >Создать пост</MyButton>
        </form>

    )

}

export default PostForm;

