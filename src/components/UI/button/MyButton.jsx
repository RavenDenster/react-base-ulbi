import React from 'react'
import classes from './MyButton.module.css'


const MyButton = ({children, ...props}) => { // здесь озвращается объект дочерних элементов / реакт не понимает в какое место надо добавлять комп
    //console.log(children)
    //console.log(props)
    return (

        <button {...props} className = {classes.myBtn}>  

            {children}

        </button>

    )
}

export default MyButton

// стр 9 мы получаем стиль как свойство объекта