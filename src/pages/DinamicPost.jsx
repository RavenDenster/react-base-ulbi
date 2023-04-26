import React, { useEffect, useMemo, useRef, useState } from 'react';
import PostList from '../components/PostList';
import MyButton from '../components/UI/button/MyButton';
import '../styles/App.css';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';
import MyModal from '../components/UI/MyModal/MyModal';
import { usePosts } from '../hooks/usePosts';
import PostService from '../API/PostService';
import Loader from '../components/UI/Loader/Loader';
import { useFetching } from '../hooks/useFetching';
import { getPageCount } from '../utils/pages';
import Pagination from '../components/UI/pagination/Pagination';
import { useObserver } from '../hooks/useObserver';
import MySelect from '../components/UI/select/MySelect';


function DinamicPosts() {

    const [posts, setPosts2] = useState([])
    const [filter, setFilter] = useState({ sort: '', query: '' })
    const [modal, setModal] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const lastElement = useRef()


    const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit, page)

        setPosts2([...posts, ...response.data])  // первый это те посты которые есть, а второе это все
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit))
    })

    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        setPage(page + 1)
    })

    useEffect(() => {
        fetchPosts(limit, page)
    }, [page, limit])

    const createPost = (newPost) => {
        setPosts2([...posts, newPost])
        setModal(false)
    }

    const removePost = (post) => {
        setPosts2(posts.filter(p => p.id !== post.id))
    }

    const changePage = (page) => {
        setPage(page)
    }

    return (
        <div className="App">

            <MyButton style={{ marginTop: 70 }} onClick={() => setModal(true)}>
                создать пользователя
            </MyButton>

            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost} />
            </MyModal>

            <hr style={{ margin: '15px 0' }} />

            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            <MySelect
                value={limit}
                onChange={value => setLimit(value)}
                defaulValue='Кол-во элементов на странице'
                options={[
                    { value: 5, name: '5' },
                    { value: 10, name: '10' },
                    { value: 25, name: '25' },
                    { value: -1, name: 'Показать всё' },
                ]}
            />
            {postError &&
                <h1>Произошла ошибка: ${postError}</h1>
            }

            <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Список постов' />
            <div ref={lastElement} style={{ height: 0, background: 'red' }}></div>

            {isPostsLoading &&
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}> <Loader /> </div>
            }


            <Pagination page={page} changePage={changePage} totalPages={totalPages} />

        </div>
    );

}

export default DinamicPosts;
