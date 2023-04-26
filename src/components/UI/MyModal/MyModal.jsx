import React from 'react';
import cl from './MyModal.module.css'

const MyModal = ({ children, visible, setVisible }) => { // сам компонент не может контролировать видемость эти будет управлять родительский компанент app / visible отвечает за то видно или нет / setVisible будет модальное окно скрывать если мы нажмём на тёмную область

    const rootClasses = [cl.myModal]
    if (visible) {
        rootClasses.push(cl.active)
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={cl.myModalContent} onClick={(e) => e.stopPropagation()}>  {/* при клике события погружаются и при всплытие это событие отрабатывается и дальше останавливается */}
                {children}
            </div>
        </div>
    )
}

export default MyModal   //join возвращает строку и в нашем случае классы склеенные по пробелу