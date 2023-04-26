import { useState } from "react"

export const useFetching = (callback) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const fetching = async (...args) => {  // мы получаем здесь и передаём в коллбэк
        
        try {
            setIsLoading(true)
            //console.log(...args, 'fdf');
            await callback(...args)
        } catch(e) {   // мы обрабатываем ошибку здесь, а не в PostService так как там мы её обрабатываем на уровне сервиса и не уходем выше, а так мы предоставляем обработку самому хуку
            setError(e.message)
        } finally {
            setIsLoading(false)
        }
    }
    //console.log([fetching, isLoading, error])
    
    return [fetching, isLoading, error] // мы возвращаем массивом для деструкторизации
}