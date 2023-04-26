import React from 'react';
import { useState } from 'react';

const Counter = function () { // компонент это функция, которая вызывает jsx

    const [count, setCount] = useState(0) // useState это hook и мы не можем их вкладывать в функции, условия, циклы и тд. Только на верхнем уровне вложенности компонентов или кастомного хука

    function decrement() {
        setCount(count - 1)
    }

    function increment() {
        setCount(count + 1)
    }

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={decrement}>Decrement</button>
            <button onClick={increment}>Increment</button>
        </div>
    )
}

export default Counter