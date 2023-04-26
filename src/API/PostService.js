import axios from 'axios'

export default class PostService {
    static async getAll(limit = 10, page = 1) { // здесь мы указываем просто по умолчанию
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', { // можно захардкодить, но в аксиум можно передать вторым парам 
            params: {
                _limit: limit,
                _page: page
            }
        })
        return response
    }

    static async getById(id) { // здесь мы указываем просто по умолчанию
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/' + id)
        return response
    }

    static async getCommentsByPostId(id) { // здесь мы указываем просто по умолчанию
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
        return response
    }
}