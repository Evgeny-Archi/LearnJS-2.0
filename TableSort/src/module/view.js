import {EventEmitter} from './utils'

export class View extends EventEmitter {
    constructor() {
        super()
        this.usersWrap = document.querySelector('.users')
        this.loadButton = document.querySelector('#load-button')
        this.preloader = document.querySelector('#fake-user-row') // Шаблон прелоадера
        this.userRow = document.querySelector('#user-row')

        this.loadButton.addEventListener('click', this.getUsers.bind(this))
    }

    getUsers(e) {
        e.preventDefault()
        e.target.disabled = true
        this.emit('loadUsers')
    }

    getRandomValue(min, max) {
        return Math.floor(Math.random() * (max - min) + min)
    }

    setPreloader() {
        // Создаем обертку для прелоадера
        const preloaderWrap = document.createElement('div')
        preloaderWrap.classList.add('rows-fake')

        // Находим каждую ячейку в таблице прелоадера для задания рандомной ширины
        const columns = Array.from(this.preloader.content.querySelectorAll('.td-fake'))
        columns.map(item => item.style.width = this.getRandomValue(20,100) + '%')

        // Находим аватарки и присваиваем им задний фон
        const avatars = Array.from(this.preloader.content.querySelectorAll('.name-icon-fake'))
        avatars.map(item => item.style.background = '#e4e7eb')

        // Добавляем в обертку
        preloaderWrap.append(this.preloader.content.cloneNode(true))

        this.usersWrap.append(preloaderWrap)
        return preloaderWrap
    }

    removePreloader(preloader) {
        preloader.remove()
    }

    showError(error) {
        this.usersWrap.textContent = error
    }

    renderUsers(data) {
        if (!data.length) {
            this.usersWrap.textContent = 'No users'
        }

        data.map(user => {
            const userRow = this.userRow.content.cloneNode(true)
            userRow.querySelector('.')
        })
    }
}