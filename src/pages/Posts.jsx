import React, { useEffect, useMemo, useRef, useState } from 'react';
import ClassCounter from '../components/ClassCounter';
import Counter from '../components/Counter';
import Postitem from '../components/Postitem';
import PostList from '../components/PostList';
import MyInput from '../components/UI/input/MyInput';
import MyButton from '../components/UI/button/MyButton';
import '../styles/App.css';
import ReflectInput from '../components/ReflectInput';
import PostForm from '../components/PostForm';
import MySelect from '../components/UI/select/MySelect';
import PostFilter from '../components/PostFilter';
import MyModal from '../components/UI/MyModal/MyModal';
import { usePosts } from '../hooks/usePosts';
import axios from 'axios'
import PostService from '../API/PostService';
import Loader from '../components/UI/Loader/Loader';
import { useFetching } from '../hooks/useFetching';
import { getPageCount, getPagesArray } from '../utils/pages';
import Pagination from '../components/UI/pagination/Pagination';


function Posts() {

  const [posts, setPosts2] = useState([
    // { id: 1, title: 'Ruby', body: 'Discription-1' },  
  ])
  // const [selectedSort, setSelectedSort] = useState('')
  // const [searchQuery, setSearchQuery] = useState('') 
  const [filter, setFilter] = useState({ sort: '', query: '' })
  const [modal, setModal] = useState(false)

  const [totalPages, setTotalPages] = useState(0) // состояние для общего кол-во постов
  const [limit, setLimit] = useState(10) // состояние для лимита 
  const [page, setPage] = useState(1)  //состояние для номера текущей страницы / от сюда мы их передаём в postService

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
  //const [isPostsLoading, setIsPostsLoading] = useState(false)

  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => { // мы передаём в useFetching callback, а в асинхронную limit, page, которые позже передаём в коллбэк
    const response = await PostService.getAll(limit, page) // передавая эти параметры json placeholder пойдёт что мы хотим реализовать пагинацию
    //console.log(limit, page);
    setPosts2(response.data)
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit)) // без указаний limit и page сервер нам не вернёт инфу
  })


  useEffect(() => { // если колбэк возвращает какоую-то функцию, то она будет вызвана в момент демонтирования компонента // мы передаём функцию в useFetching и то что он нам возвращает диструктуризируем
    fetchPosts(limit, page) // по факту сама функция выполнения вызова это и есть fetchPosts
  }, []) // этот хук помогает управлять жизнениым циклом комонента, чтобы загрузить единыжды нужно ничего не указывать и будет стадия mount

  const createPost = (newPost) => {
    setPosts2([...posts, newPost])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts2(posts.filter(p => p.id !== post.id)) // мы создаём массив где id не равен текушему назатому id
  }

  const changePage = (page) => { // в fetchPosts мы передаём page, как параметр
    setPage(page) 
    fetchPosts(limit, page) // так как изменение состояния это асинхронный процесс мы меняем сост до того, как вызываем фукцию, чтобы это исправить мы передаём актуальные page в функцию и также передать в саму функцию для получения постов и также в fetching нужно их принять и передать коллбэк
  } // по сути параметры в строк едиструкт и в строке на верш одни и те же

  return (
    <div className="App">

      <Counter />

      <ReflectInput />

      <ClassCounter />

      {/* <PostList posts={posts} title='Список постов 1 (не раб.)' />    */}

      <MyButton style={{ marginTop: 70 }} onClick={() => setModal(true)}>
        создать пользователя
      </MyButton>

      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />  {/* это callback функция, которая передаётся параметром и выполняется по завершение другой функции */}
      </MyModal>

      <hr style={{ margin: '15px 0' }} />

      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />

      {postError &&
        <h1>Произошла ошибка: ${postError}</h1>
      }

      {isPostsLoading
        ? <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}> <Loader /> </div>
        : <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Список постов' />   //в скобках передаётся объект, для пораметра вызываемой функции 
      }

      <Pagination page={page} changePage={changePage} totalPages={totalPages}/>

    </div>
  );

}

export default Posts;

// стр 23 это испортирование компонентов 