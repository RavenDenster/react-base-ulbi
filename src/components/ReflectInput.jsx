import React from 'react';
import { useState } from 'react';

const ReflectInput = function () { // это функиональный компонент, а бывают классовые/ hook можно использовать только в фукциональных компонентах

    const [value, setValue] = useState('Текст в input')
    
    return (
        <div>
            <h1>{value}</h1>
            <input              // это управляемый компонент т.к. изменив состояние мы можем изменить значение 
                type='text'
                value={value}
                onChange={e => setValue(e.target.value)} // по факту это связыкание состояния со значением в инпуте. Это значение переданное в функцию попадает в основную ветку и теперь оно является значением value
            />
        </div>

    )
}

export default ReflectInput