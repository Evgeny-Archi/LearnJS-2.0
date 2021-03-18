import {EventEmitter, isObject, getRandomValue, getInitials} from './utils'

export class View extends EventEmitter {
    constructor() {
        super()
        this.usersWrap = document.querySelector('.users')
        this.loadButton = document.querySelector('#load-button')
        this.preloader = document.querySelector('#fake-user-row') // Шаблон прелоадера
        this.userRow = document.querySelector('#user-row')        // Шаблон пользователя
        this.backdropTemplate = document.getElementById('backdrop').content.cloneNode(true)
        this.backdrop = this.backdropTemplate.querySelector('.backdrop')
        // Кнопки фильтра и сортировки
        this.sortUserBtn = document.getElementById('username')
        this.sortEmailBtn = document.getElementById('email-btn')
        this.sortCompanyBtn = document.getElementById('company')
        this.filterInput = document.querySelector('.search-input')

        this.boundGetUsers = this.getUsers.bind(this)

        this.loadButton.addEventListener('click', this.boundGetUsers)
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
        this.moreInfoBtn.forEach(item => item.addEventListener('click', (event) => this.emit('showPopup', {event, id: item.id})))
    }

    getUsers(e) {
        e.preventDefault()
        e.target.disabled = true                                            // Отключаем кнопку
        this.loadButton.removeEventListener('click', this.boundGetUsers)    // Удаляем обработчик
        this.usersWrap.textContent = ''                                     // Очищаем таблицу, если уже есть строки пользователей (обновить список)

        this.emit('loadUsers')
    }

    setPreloader() {
        // Создаем обертку для прелоадера
        const preloaderWrap = document.createElement('div')
        preloaderWrap.classList.add('rows-fake')

        // Находим каждую ячейку в таблице прелоадера для задания рандомной ширины
        const columns = Array.from(this.preloader.content.querySelectorAll('.td-fake'))
        columns.map(item => item.style.width = getRandomValue(20,100) + '%')

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

    renderUsers(data) {
        if (!data.length) {
            this.usersWrap.textContent = 'No users'
            return
        }

        data.map(user => {
            const initials = this.userRow.content.querySelector('.name-icon')
            initials.textContent = getInitials(user.name)
            initials.style.background = user.color
            this.userRow.content.querySelector('.js-user').textContent = user.name
            this.userRow.content.querySelector('.js-username').textContent = user.username
            this.userRow.content.querySelector('.js-contact').textContent = user.email
            this.userRow.content.querySelector('.js-company').textContent = user.company
            this.userRow.content.querySelector('.more-info-btn').id = user.id

            const userRow = this.userRow.content.cloneNode(true)
            this.usersWrap.append(userRow)
        })

        this.setNodesToModelState() // Добавляем ссылку на узел DOM элемента в модель
        this.setEventListeners()    // Назначаем обработчики на кнопки
    }

    setNodesToModelState() {        // Добавляем ссылку на узел DOM в стейт модели для последующего обращения при удалении или сортировки
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
        if (order === 'ascend') {                                                  // Рисуем стрелочки рядом с кнопкой
            target.classList.remove('ascend')
        } else {
            target.classList.add('ascend')
        }
        this.emit('sort', {target: target.id, order})
    }

    sortRow(sortedData) {
        sortedData.forEach(user => {                    // Расставляем строки в таблице по отсортированным данным
            this.usersWrap.appendChild(user.node)
        })
    }

    changeContactList(typeContact, id) {            // Изменяем контакты на выбранный из выпадающего меню
        this.sortEmailBtn.textContent = id
        const contactsCell = this.usersWrap.querySelectorAll('.js-contact')
        contactsCell.forEach((item, i) => {
            // Если контакт - строка, выводим ее. Если объект - выбираем поля объекта (city, street)
            item.textContent = isObject(typeContact[i]) ? (typeContact[i].city + ', ' + typeContact[i].street) : typeContact[i]
        })
    }

    setEditingRow(userNode) {
        const coord = userNode.getBoundingClientRect()
        // const editRow = document.createElement('div')
        // editRow.classList.add('editing')
        // editRow.style.top = coord.y + 'px'
        // editRow.style.left = coord.x + 'px'
        // editRow.style.width = coord.width + 'px'
        // document.body.append(editRow)
        userNode = userNode.cloneNode(true)
        userNode.classList.add('editing')
        // userNode.style.top = coord.y + 'px'
        // userNode.style.left = coord.x + 'px'
        // userNode.style.width = coord.width + 'px'
        // document.body.append(userNode)
        document.body.append(this.backdrop)
    }

    deleteUserRow(deleteNode) {
        this.activateLoadButton()

        deleteNode.classList.add('deleting')                    // Добавляем анимацию удаления
        deleteNode.addEventListener('animationend', () => {     // Удаляем после завершения анимации
            deleteNode.remove()
        })
    }

    activateLoadButton() {
        this.loadButton.disabled = false
        this.loadButton.textContent = 'Обновить список'
        this.loadButton.addEventListener('click', this.boundGetUsers)
    }

}