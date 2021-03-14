import {EventEmitter} from './utils'

export class View extends EventEmitter {
    constructor() {
        super()
        this.usersWrap = document.querySelector('.users')
        this.loadButton = document.querySelector('#load-button')
        this.preloader = document.querySelector('#fake-user-row') // Шаблон прелоадера
        this.userRow = document.querySelector('#user-row')        // Шаблон пользователя
        this.colors = ['#e4e7eb', '#fae2e2', '#fae3cd', '#fbe6a2', '#d2eef3', '#d4eee2', '#eae7f8']
        // Кнопки фильтра и сортировки
        this.sortUserBtn = document.getElementById('user-btn')
        this.sortEmailBtn = document.getElementById('email-btn')
        this.sortCompanyBtn = document.getElementById('company-btn')
        this.filterInput = document.querySelector('.search-input')

        this.loadButton.addEventListener('click', this.getUsers.bind(this))
        this.setDisabledButtons(true) // Отключаем кнопки пока не загружены данные
    }

    setDisabledButtons(bool) {
        this.filterInput.disabled = bool
        this.sortUserBtn.disabled = bool
        this.sortEmailBtn.disabled = bool
        this.sortCompanyBtn.disabled = bool
    }

    setEventListeners() {
        this.filterInput.addEventListener('input', this.handlerFilter.bind(this))
        this.sortUserBtn.addEventListener('click', this.handlerSort.bind(this))
        this.sortCompanyBtn.addEventListener('click', this.handlerSort.bind(this))

        this.moreInfoBtn = document.querySelectorAll('.more-info-btn')
        this.moreInfoBtn.forEach(item => item.addEventListener('click', (event) => this.emit('showPopup', event)))
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
        // Загрузка данных прошла - включаем кнопки сортировки и фильтра, удаляем прелоадер
        this.setDisabledButtons(false)
        preloader.remove()
    }

    showError(error) {
        this.usersWrap.textContent = error
    }

    getInitials(name) {
        return name.split(' ').slice(0, 2).map(item => item.charAt(0).toUpperCase()).join('')
    }

    renderUsers(data) {
        if (!data.length) {
            this.usersWrap.textContent = 'No users'
            return
        }

        data.map(user => {
            const initials = this.userRow.content.querySelector('.name-icon')
            initials.textContent = this.getInitials(user.name)
            initials.style.background = this.colors[this.getRandomValue(0, this.colors.length)]
            this.userRow.content.querySelector('.js-user').textContent = user.name
            this.userRow.content.querySelector('.js-username').textContent = user.username
            this.userRow.content.querySelector('.js-contact').textContent = user.email
            this.userRow.content.querySelector('.js-company').textContent = user.company
            this.userRow.content.querySelector('.more-info-btn').id = user.id

            const userRow = this.userRow.content.cloneNode(true)
            this.usersWrap.append(userRow)
        })

        this.setNodesToModelState() // Добавляем ссылку на узел DOM элемента в модель
        this.setEventListeners()
    }

    setNodesToModelState() {
        const tempNodes = this.usersWrap.querySelectorAll('.tr')
        this.emit('setNodes', tempNodes)
    }

    handlerFilter(event) {
        const filter = event.target.value.toLowerCase()
        this.emit('filter', {filter, inputType: event.inputType})
    }

    filterRow(filterData, inputType) {
        const userNameSpan = this.usersWrap.querySelectorAll('.js-user') // Получаем ячейки с именами

        if (inputType === 'deleteContentBackward') {                  // Если удаляем символы, то добавляем юзеров по новым отфильтрованным данным
            filterData.forEach(user => {
                this.usersWrap.appendChild(user.node)
            })
        } else {
            const filteredNames = filterData.map(user => user.name)   // Получаем имена из объектов массива

            userNameSpan.forEach(span => {
                const userName = span.textContent                     // Получаем имя из ячейки
                if (!filteredNames.includes(userName)) {              // Если имени из ячейки нет в отфильтрованных данных, то удаляем
                    span.parentNode.parentNode.remove()
                }
            })
        }
    }

    handlerSort({target}) {
        const order = target.classList.contains('ascend') ? 'ascend' : 'descend'   // Смотрим направление сортировки
        if (order === 'ascend') {
            target.classList.remove('ascend')
        } else {
            target.classList.add('ascend')
        }
        this.emit('sort', {target, order})
    }

    sortRow(sortedData) {
        sortedData.forEach(user => {                    // Расставляем строки в таблице по отсортированным данным
            this.usersWrap.appendChild(user.node)
        })
    }
}