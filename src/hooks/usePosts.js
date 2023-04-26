import { useMemo } from 'react'

// usePost это кастомный хук

export const useSortedPosts = (posts, sort) => {
    const sortedPosts = useMemo(() => { // это массив отвечающий за сортировку / useMemo просто оболочка для оптимизачии
        //console.log('dddddddddddddd');
        if (sort) {
            return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]))
        }
        return posts

    }, [sort, posts]) // код отрабатывает только когда изменяется элемент в массиве зависимости 

    return sortedPosts
}

export const usePosts = (posts, sort, query) => {
    const sortedPosts = useSortedPosts(posts, sort)

    const sortedAndSearchedPosts = useMemo(() => {  //  это массив отвечающий за филтрацию
        return sortedPosts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()))
    }, [query, sortedPosts])

    return sortedAndSearchedPosts
}

