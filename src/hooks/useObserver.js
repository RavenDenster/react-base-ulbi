import { useRef, useEffect } from "react"

export const useObserver = (ref, canLoad, isLoading, callback) => {
    const observer = useRef() // референс нужен не только для получения к достобу дом элементу, а также в него можно сохранять данные чтобы не терять от рендеру к рендеру
    useEffect(() => {
        if (isLoading) return
        if (observer.current) observer.current.disconnect()
        let cb = function (entries, observer) {
            if (entries[0].isIntersecting && canLoad) {
                // console.log(entries);
                // console.log('div here');
                //console.log(page);
                callback()
            }
        }
        observer.current = new IntersectionObserver(cb)
        observer.current.observe(ref.current)
    }, [isLoading])
}