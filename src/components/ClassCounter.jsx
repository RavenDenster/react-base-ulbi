import React from 'react';

class ClassCounter extends React.Component { // классовые компоненты это усторевший подход сейчас используется jsx

    constructor(props) { // props это пустой объект для класса
        super(props)
        this.state = { // state специально зарезервированный свойство. Он заменяет первый параметр в useState
            count: 0
        }
        this.increment = this.increment.bind(this) // контекст компонента фукции меняется
        this.decrement = this.decrement.bind(this)
    }

    decrement() { // слово function убираем т.к. работаем внутри класа
        this.setState({count: this.state.count - 1}) // чтобы изменить состояние в классе нужно вызвать setState
    }

    increment() {
        this.setState({count: this.state.count + 1})
    }

    render() { // классовые компоненты работают иначе и нужно реализовать функцию render, которая будет возвращать jsx
        return (
            <div>
                <h1>{this.state.count}</h1>
                <button onClick={this.decrement}>Decrement</button>
                <button onClick={this.increment}>Increment</button>
            </div>
        )
    }
}

export default ClassCounter