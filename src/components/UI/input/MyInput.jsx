import React from 'react'
import classes from './MyInput.module.css'

const MyInput = React.forwardRef((props, ref) => {  // второй параметр это сама ссылка. Если в компоненте сложная структура мы можем указать куда она будет попадать
    //console.log(props);
    return (

        <input ref = {ref} className = {classes.myInput} {...props} />

    )
})

export default MyInput

// 8 страка спрет потому что мы получаес объект