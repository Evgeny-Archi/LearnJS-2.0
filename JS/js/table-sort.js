/*
Simple sorting and filter table script with fetch query to get fake date
 */
window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    class Template {
        constructor() {
            this.table = document.querySelector('.table')
            this.loadButton = document.getElementById('load-button')
            this.sortUserBtn = document.getElementById('user-btn')
            this.sortEmailBtn = document.getElementById('email-btn')
            this.sortCompanyBtn = document.getElementById('company-btn')
            this.filterInput = this.table.querySelector('.search-input')

            // Отключаем кнопки фильтра и сортировки пока нет данных
            this.filterInput.disabled = true
            this.sortUserBtn.disabled = true
            this.sortEmailBtn.disabled = true
            this.sortCompanyBtn.disabled = true

            this.usersTable = null  // Здесь будет хранится шаблон всех загруженных пользователей
            this.colors = ['#e4e7eb', '#fae2e2', '#fae3cd', '#fbe6a2', '#d2eef3', '#d4eee2', '#eae7f8']

            this.loadButton.addEventListener('click', () => model.load())
            this.filterInput.addEventListener('input', (event) => model.handlerFilter(event))
            this.sortUserBtn.addEventListener('click', (event) => model.handlerSort(event))
            this.sortCompanyBtn.addEventListener('click', (event) => model.handlerSort(event))
            this.sortEmailBtn.addEventListener('click', (event) => {
                dropdown.showDropdownMenu(event, 'withSort')
            })
        }

        // Получаем случайное значение от min до max. Использование: получение случайной ширины для прелоадеров и случайного цвета для аватарки
        getRandomValue(min, max) {
            return Math.floor(Math.random() * (max - min) + min)
        }

        // Получаем инициалы (первые буквы первых 2-х слов) для аватарки
        getInitials(initials) {
            return initials.split(' ').slice(0, 2).map(item => item.charAt(0).toUpperCase()).join('')
        }

        // Прелоадер строк во время загрузки данных пользователей
        setPreloaderRows() {
            let temp = ''

            for (let i = 0; i < 10; i++) {
                temp += `<div class="tr-fake">
                    <div class="td"><span class="name-icon-fake" style="background: ${this.colors[this.getRandomValue(0, this.colors.length)]};"></span><span class="td-fake" style="width: ${this.getRandomValue(20, 100)}%;"></span></div>
                    <div class="td"><span class="td-fake" style="width: ${this.getRandomValue(20, 100)}%;"></span></div>
                    <div class="td"><span class="td-fake" style="width: ${this.getRandomValue(20, 100)}%;"></span></div>
                    <div class="td"><span class="td-fake" style="width: ${this.getRandomValue(20, 100)}%;"></span></div>
                </div>`
            }

            const rows = document.createElement('div')
            rows.classList.add('rows-fake')
            rows.insertAdjacentHTML('afterbegin', temp)
            this.table.append(rows)

            return rows // Возвращаем DOM элемент прелоадера для его удаления после загрузки
        }

        removePreloaderRows(tempRows) {
            // Загрузка данных прошла - включаем кнопки сортировки и фильтр
            this.filterInput.disabled = false
            this.sortUserBtn.disabled = false
            this.sortEmailBtn.disabled = false
            this.sortCompanyBtn.disabled = false
            this.loadButton.textContent = 'Загрузить еще...'
            tempRows.remove()
        }

        createElement(tag, props, ...children) {
            const elem = document.createElement(tag)

            Object.keys(props).forEach(key => {
                    elem[key] = props[key]
            })

            children.forEach(child => {
                if (typeof child === 'string') {
                    child = document.createTextNode(child)
                }
                elem.appendChild(child)
            })

            return elem
        }

        renderUsers(data) {
            if (!this.usersTable) { // Чтобы исключить создание новой обертки для юзеров, проверяем есть ли она. Если есть, то добавляем в нее.
                const usersWrap = this.createElement('div', { className: 'users' })
                this.usersTable = usersWrap
            }
            if (!data.length) {  // Если пришел пустой массив, делаем заглушку
                const noUsers = this.createElement('div', { className: 'tr' }, 'No users')
                this.usersTable.appendChild(noUsers)
            }

            data.forEach((user, index) => {
                if (!user.nodeDOM) { // Если нет ссылки на DOM узел, то создаем строку и добавляем в таблицу
                    const span = this.createElement('span', {
                            className: 'name-icon',
                            style: `background: ${this.colors[this.getRandomValue(0, this.colors.length)]};`
                        },
                        this.getInitials(user.name))
                    const tdName = this.createElement('div', { className: 'td' }, span, user.name)
                    const tdUsername = this.createElement('div', { className: 'td' }, user.username)
                    const tdEmail = this.createElement('div', { className: 'td' }, user.email)
                    const tdCompany = this.createElement('div', { className: 'td' }, user.company)
                    const moreInfoBtn = this.createElement('button', { className: 'more-info-btn', id: user.id })
                    const tdMoreInfo = this.createElement('div', { className: 'td-info' }, moreInfoBtn)
                    const tr = this.createElement('div', { className: 'tr' }, tdName, tdUsername, tdEmail, tdCompany, tdMoreInfo)

                    moreInfoBtn.addEventListener('click', (event) => {
                        dropdown.showDropdownMenu(event, 'onlyLinks')
                    })

                    this.usersTable.appendChild(tr)

                    this.modelState[index].nodeDOM = tr // Добавляем ссылку строки в таблице в объект модели
                }
            })

            this.table.appendChild(this.usersTable)
        }

        // Фильтрация списка по отфильтрованным данным из модели
        filterUsers(data) {
            /* Самый простой вариант фильтра по данным из модели. Можно оставить только его в фу-ции */
            // this.usersTable.textContent = ''
            // this.renderUsers(data)

            /* Вариант по сложней.
             Если входящий массив больше отфильтрованных строк в таблице, то отрисовываем их заново по массиву из модели */
            const tds = this.usersTable.querySelectorAll('.td:first-child') // Получаем ячейки с именами
            if (data.length > tds.length) {
                data.forEach(user => {
                    this.usersTable.appendChild(user.nodeDOM)
                })
            } else {                                            // Если отфильтрованных данных меньше, чем строк в таблице, то удаляем те, которых нет в данных
                const dataNames = data.map(user => user.name)   // Получаем имена из объектов массива

                tds.forEach(td => {
                    const userName = td.textContent.substring(2) // Получаем имя из ячейки и удаляем первые 2 буквы аватарки
                    if (!dataNames.includes(userName)) {         // Если имени из ячейки нет в отфильтрованных данных, то удаляем
                        td.parentNode.remove()
                    }
                })
            }
        }

        /* Простой фильтр по DOM элементам без использования отфильтрованных данных из модели */
        // filter({ target }) {
        //     const filter = target.value.toLowerCase()
        //     const rows = this.usersTable.querySelectorAll('.tr')
        //
        //     rows.forEach(row => {
        //         const textContent = row.children[0].textContent.toLowerCase().trim().slice(2) // Удаляем пробелы и первые 2 символа аватарки
        //         if (!textContent.includes(filter)) {
        //             row.style.display = 'none'
        //         } else {
        //             row.style.display = ''
        //         }
        //     })
        // }

        // Сортировка таблицы по переданным данным
        sortRows(sortedData, target) {
            const order = target.classList.contains('ascend') ? 'ascend' : 'descend'   // Смотрим направление сортировки

            if (order === 'ascend') {
                target.classList.remove('ascend')
                sortedData = sortedData.reverse()
            } else {
                target.classList.add('ascend')
            }

            sortedData.forEach(user => {                    // Расставляем строки в таблице по отсортированным данным
                this.usersTable.appendChild(user.nodeDOM)
            })
        }
    }

    class Model extends Template{
        constructor() {
            super()
            this.state = []
        }

        get modelState() {
            return this.state
        }

        set modelState(value) {
            if (Array.isArray(value)) {
                this.state = value
            }
        }

        get filteredData() {
            return this.filteredState
        }

        set filteredData(value) {
            if (Array.isArray(value)) {
                this.filteredState = value
            }
        }

        // Фильтрация модели и передача отфильтрованных данных представлению
        handlerFilter({ target }) {
            if (!this.modelState.length) return
            const filter = target.value.toLowerCase()
            this.filteredData = this.modelState.filter(user => {
                return user.name.toLowerCase().includes(filter)
            })
            this.filterUsers(this.filteredData)
        }

        // Сортировка модели и передача представлению
        handlerSort({ target }) {
            // Смотрим есть ли отфильтрованные данные, если есть, то сортировку делаем по ним
            const sortedData = (this.filteredData) ? this.filteredData : this.modelState
            let value = null

            switch(target.id) {
                case 'user-btn':
                    value = 'username'
                    break
                case 'email-btn':
                    value = 'email'
                    break
                case 'company-btn':
                    value = `company`
                    break
            }

            sortedData.sort((a, b) => {
                a = a[value].trim().toLowerCase()
                b = b[value].trim().toLowerCase()
                if (a > b) return 1
                if (a < b) return -1
                return 0
            })

            this.sortRows(sortedData, target)
        }

        fixCompanyName(data) {
            data.forEach(user => {
                user.company = user.company.name
            })
        }

        async getUsers() {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users')
                if (!response.ok) throw new Error('Ошибка сети')
                const data = await response.json()
                return data
            } catch (error) {
                throw new Error('Не удалось получить данные от сервера')
            }
        }

        async load() {
            try {
                const tempRows = this.setPreloaderRows()         // Добавляем заглушки во время загрузки данных
                const data = await this.getUsers()               // Получаем данные с сервера
                this.fixCompanyName(data)                        // Убираем ненужные поля в объекте company и оставляем только название компании
                this.modelState.push(...data)                    // Пушим данные в стейт
                this.removePreloaderRows(tempRows)               // Удаляем заглушки
                this.renderUsers(this.modelState)                // Рисуем таблицу с пользователями
            } catch (error) {
                console.log(error)
            }
        }
    }

    class Dropdown {
        constructor(model) {
            this.model = model
            this.isDropdown = false
        }

        get dropdown() {
            return this._dropdown
        }

        set dropdown(value) {
            this._dropdown = value
        }

        showDropdownMenu({ target }, props) {
            // if (!dropdown in html) create dropdown in DOM
            // isDropdown = true
            //
            // Append dropdown to document and show (add classList 'active')
            // Add event listeners to links
            // Click - remove classList 'active'

            if (!this.dropdown) {
                if (props === 'withSort') {
                    const ascendLink = this.model.createElement('a', { href: '', id: 'ascend'}, 'Ascending')
                    const descendLink = this.model.createElement('a', { href: '', id: 'descend'}, 'Descending')
                    const orderWrap = this.model.createElement('div', { id: 'order' }, ascendLink, descendLink)
                    const titleOrder = this.model.createElement('div', { className: 'title' }, 'Order')

                    const emailLink = this.model.createElement('a', { href: '', id: 'email', className: 'selected'}, 'Email')
                    const phoneLink = this.model.createElement('a', { href: '', id: 'phone'}, 'Phone')
                    const addressLink = this.model.createElement('a', { href: '', id: 'address'}, 'Address')
                    const menuWrap = this.model.createElement('div', { id: 'menu' }, emailLink, phoneLink, addressLink)
                    const titleMenu = this.model.createElement('div', { className: 'title bordered' }, 'Show')

                    const dropdownNav = this.model.createElement('div', { className: 'tip-menu__nav' }, titleOrder, orderWrap, titleMenu, menuWrap)
                    this.dropdown = this.model.createElement('div', { className: 'tip-menu' }, dropdownNav)

                    document.body.append(this.dropdown)
                }
            }
            /*
            <div class="tip-menu">
                <div class="tip-menu__nav">
                    <div class="title">Order</div>
                    <div id="order">
                        <a href="" id="ascend">Ascending</a>
                        <a href="" id="descend">Descending</a>
                    </div>
                    <div class="title bordered">Show</div>
                    <div id="menu">
                        <a href="" id="email" class="selected">Email</a>
                        <a href="" id="phone">Phone</a>
                        <a href="" id="address">Address</a>
                    </div>
                </div>
            </div>
             */

            const coordinate = target.getBoundingClientRect()

            this.dropdown.style.left = coordinate.x + 'px'
            this.dropdown.style.top = coordinate.y + 'px'
        }
    }

    const model = new Model()
    const dropdown = new Dropdown(model)
    // model.load()

})

/*
<div class="tr">
 <div class="td">
         <span class="name-icon" style="background: ${this.colors[this.getRandomValue(0, this.colors.length)]};">${this.getInitials(user.name)}</span>${user.name}
     </div>
      <div class="td">${user.username}</div>
      <div class="td">${user.email}</div>
      <div class="td">${user.company.name}</div>
   </div>

*/
