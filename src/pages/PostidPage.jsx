import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostService from '../API/PostService';
import Loader from '../components/UI/Loader/Loader';
import { useFetching } from '../hooks/useFetching';


const PostidPage = () => {
    let params = useParams() // хук помогает посучить ссылку диномически. для этого мы указываем в AppRouter у нужно ссылк :id и при переходе на эту страницу он создаёт объект
    //console.log(params);
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])

    const [fetchPostId, isLocading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id)
        setPost(response.data)
    })

    const [fetchComment, isComLocading, comError] = useFetching(async (id) => { // (возможно. id это params.id, который передаётся через useEffect)
        const response = await PostService.getCommentsByPostId(id)
        setComments(response.data)
    })

    useEffect(() => {
        //console.log(params.id);
        fetchPostId(params.id)  // params.id мы передаём в fetchComment , как ...args и потом возврашаемся в callback с нужными паметрами и делаем в hooke, что хотим
        fetchComment(params.id)
    }, [])
    //console.log(post);
    //console.log(params);
    return (
        <div>
            <h1>Вы открыли страницу поста с ID = {params.id}</h1>
            {isLocading
                ? <Loader />
                : <div>{post.id}. {post.title}</div>
            }

            <h1>
                Комментарии
            </h1>

            {isComLocading
                ? <Loader />
                : <div>
                    {comments.map(comm => 
                        <div style={{marginTop: 15}} key={comm.id} >
                            <h5>{comm.email}</h5>
                            <div>{comm.body}</div>
                        </div>
                        )}
                </div>
            }

        </div>
    )
}

export default PostidPage;