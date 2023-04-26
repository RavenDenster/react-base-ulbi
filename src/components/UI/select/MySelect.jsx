import React from 'react';


const MySelect = ({ options, defaulValue, value, onChange }) => {
    //console.log(options);
    //console.log(value);
    return (
        <select
            value={value} // это для того, что по умолчанию ничего не выбранно
            onChange={e => onChange(e.target.value)} // это value select а не обычное
        >

            <option disabled value=''>{defaulValue}</option>     {/* изначально у нас value пустое и его функция и выбирает */}
            {options.map(option =>
                <option key={option.value} value={option.value}>

                    {option.name}
                </option>
            )}

        </select>
    )
}

export default MySelect;