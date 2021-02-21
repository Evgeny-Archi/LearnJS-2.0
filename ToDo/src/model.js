import { EventEmitter } from "./helper"

class Model extends EventEmitter {
    constructor(state = []) {
        super()
        this.state = state
    }

    setLocalStorage() {
        localStorage.setItem('todo', JSON.stringify(this.state))
    }

    getItem(id) {
        return this.state.find(item => item.id == id)
    }

    addItem(title) {
        const todo = {
            id: Date.now(),
            title: title,
            completed: false
        }
        this.state.push(todo)
        this.setLocalStorage()
        return todo
    }

    updateItem(id, data) {
        const item = this.getItem(id)
        Object.keys(data).forEach(prop => item[prop] = data[prop])  // см. Some tips
        this.setLocalStorage()
        return item
    }

    removeItem(id) {
        const index = this.state.findIndex(item => item.id == id)   // Ищем индекс нужного элемента (todo) в массиве state, для его удаления
        if (index > -1) {
            this.state.splice(index, 1)                  // Удаляем элемент из массива
            this.setLocalStorage()
        }
    }
}

export default Model

/*
Some tips:

Как работает updateItem():
Обновляет элемент массива: берем объект из массива по id, перебираем по ключам и записываем в свойства значения из даты
const arr = [                                               // Исходный массив
    {id: 1, name: 'one'},
    {id: 2, name: 'two'}
]
const elem = arr.find(item => item.id === 1)                // Находим элемент в массиве по id объекта
const data = {id: 3, name: 'three'}                         // То на что будем менять
Object.keys(elem).forEach(prop => elem[prop] = data[prop])  // Перебираем свойства объекта и присваиваем им значения из дата
arr = [                                                     // Теперь в arr первый элемент с id = 1 будет заменен на значения из дата
    {id: 3, name: 'three'}
    {id: 2, name: 'two'}
 ]
*/
