import {EventEmitter} from './utils'

export class Popup extends EventEmitter {
    constructor() {
        super()
        this.sortEmailBtn = document.getElementById('email-btn')
        this.popupTemplateContacts = document.querySelector('#popupContacts').content.cloneNode(true)
        this.popupTemplateInfo = document.querySelector('#popupInfo').content.cloneNode(true)
        this.popupContacts = this.popupTemplateContacts.querySelector('.tip-menu')
        this.popupInfo = this.popupTemplateInfo.querySelector('.tip-menu')
        this.targetId = null    // Нужен для проверки повторного нажатия на кнопку (сравнения по id ранее нажатой кнопки и нажатой в текущий момент)
        this.isOpen = false     // Нужен для проверки перед закрытием меню, если нажатие произошло по той же кнопке
        this.selectedContact = 'email' // Сохраняем выбранный контакт (email, address, phone) для передачу на сортировку

        this.popupContacts.querySelector('#order').addEventListener('click', this.sortContacts.bind(this))
        this.popupContacts.querySelector('#menu').addEventListener('click', this.changeContacts.bind(this))

        // Открываем меню и передаем фрагмент DOM для его отрисовки
        this.sortEmailBtn.addEventListener('click', (event) => this.show(event, this.popupContacts))
        // Закрываем уже открытые меню перед отрисовкой
        document.body.addEventListener('closeOpenedPopup', (event) => this.close(event))
        // Закрываем меню при нажатии на свободную область
        document.body.addEventListener('click', (event) => this.close(event))
    }

    show(event, target) {
        event.stopPropagation() // Отменяем всплытие, чтобы не срабатывало событие клик на документе
        
        if (this.targetId === event.target.id && this.isOpen) { // Если меню открыто и клик по той же кнопке, то просто закрываем
            this.close(event)
        } else {
            this.open(event, target)
        }
        
        this.targetId = event.target.id     // Присваиваем id нажатой кнопки для последующего сравнения с id следующего нажатия
    }

    open(event, target) {
        // Создаем кастомное событие, чтобы удалить уже открытое меню и не дублировать его (при нажатии на email btn, а потом на more info btn)
        const closeOpenedPopupEvt = new CustomEvent('closeOpenedPopup')
        document.body.dispatchEvent(closeOpenedPopupEvt)

        this.getCoordinate(event, target)
        
        document.body.append(target)
        this.isOpen = true
    }

    close(event) {
        const target = document.querySelector('.tip-menu') || undefined
        if (target && !event.target.closest('.tip-menu')) {     // Если меню открыто (обработано querySelector) и не нажато на само меню, то удаляем
            target.remove()
            this.isOpen = false
        }
    }

    // Получаем координаты клика
    getCoordinate(event, target) {
        const coordinate = event.target.getBoundingClientRect()
        coordinate.y += 26                                  // Делаем отступ сверху
        if (target.classList.contains('popup-info')) {      // Если это боковое меню, то отодвигаем влево, внутрь таблицы 
            target.style.left = coordinate.x - 170 + 'px'
            target.style.top = coordinate.y + 'px'
        } else {
            target.style.left = coordinate.x + 'px'
            target.style.top = coordinate.y + 'px'
        }
    }

    setMarker(event) {
        event.target.parentNode.querySelectorAll('a').forEach(link => {
            if (link.classList.contains('selected')) {
                link.classList.remove('selected')
            }
        })
        event.target.classList.add('selected')
    }

    sortContacts(event) {
        event.preventDefault()
        // Ставим маркер выбранного пункта
        this.setMarker(event)

        const order = event.target.id

        if (order === 'ascend') {
            this.sortEmailBtn.classList.add('ascend')
        } else {
            this.sortEmailBtn.classList.remove('ascend')
        }

        this.emit('sort', {target: this.selectedContact, order})
    }

    changeContacts(event) {
        event.preventDefault()
        // Ставим маркер выбранного пункта
        this.setMarker(event)
        
        // Сохраняем выбранный контакт (email, phone, address)
        this.selectedContact = event.target.id

        this.emit('changeContactInfo', event.target.id)
    }
}