import React from 'react';
import Postitem from './Postitem'
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';

const PostList = ({ posts, title, remove }) => { // эти внутренние скобки диструкторизация, вообще похуй на каком месте аргуметы главное чтоб бляцкие названия совпали
    //console.log(posts);

    if (!posts.length) { // всё начинает работать с запуска т.к. мы сразу вызываем sortedAndSearchedPosts, а она в свою очередь возвращает sortedPosts где лежит объект
        return (
            <h1 style={{ textAlign: 'center' }} >
                Посты не найдены!
            </h1>
        )
    }

    return (
        <div>

            <h1 style={{ textAlign: 'center' }} >
                {title}
            </h1>

            <TransitionGroup>
                {posts.map((post, index) =>
                    <CSSTransition
                        key={post.id} 
                        timeout={500}
                        classNames="post"
                    >
                        <Postitem remove={remove} number={index + 1} post={post} />  
                    </CSSTransition> 
                )}
            </TransitionGroup>   {/*каждый элемент преобразовывает в реакт элемент / ключ так смеха ради  */}

            {/* для вставки js в jsx нужны такие скобки 48 стр*/}
            {/* ключ надо указывать у корневого элемента */}
        </div>
    )
}

export default PostList;


