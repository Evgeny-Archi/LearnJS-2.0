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

        this.setEventListeners(target)
    }

    close(event) {
        const target = document.querySelector('.tip-menu') || undefined
        if (target && !event.target.closest('.tip-menu')) {     // Если меню открыто (обработано querySelector) и не нажато на само меню, то удаляем
            target.remove()
            this.isOpen = false
        }
    }

    getCoordinate(event, target) {
        const coordinate = event.target.getBoundingClientRect()
        coordinate.y += 26
        if (target.classList.contains('popup-info')) {
            target.style.left = coordinate.x - 170 + 'px'
            target.style.top = coordinate.y + 'px'
        } else {
            target.style.left = coordinate.x + 'px'
            target.style.top = coordinate.y + 'px'
        }
    }

    setEventListeners(target) {
        if (target.classList.contains('popup-info')) {
            target.querySelector('#more-info').addEventListener('click', () => console.log('more info'))
            target.querySelector('#delete').addEventListener('click', () => console.log('delete'))
        } else {
            target.querySelector('#order').addEventListener('click', (event) => this.sort(event))
            target.querySelector('#menu').addEventListener('click', (event) => this.changeContacts(event))
        }
    }

    sort(event) {
        event.preventDefault()
        console.log(event.target.id)
    }

    changeContacts(event) {
        event.preventDefault()
        event.target.parentNode.querySelectorAll('a').forEach(link => {
            if (link.classList.contains('selected')) {
                link.classList.remove('selected')
            }
        })

        event.target.classList.add('selected')

        this.emit('changeContactInfo', event.target.id)
    }
}