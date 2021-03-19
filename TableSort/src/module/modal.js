import { EventEmitter } from "./utils"

export class Modal extends EventEmitter {
    constructor(type) {
        super()
        this.type = type // Принимаем тип модального окна (кнопки: more info, edit). Тип соответствует id DOM элемента
        this.backdropTemplate = document.getElementById('backdrop').content.cloneNode(true)
        this.backdrop = this.backdropTemplate.querySelector('.backdrop')

        this.boundClose = this.close.bind(this)
    }

    show(user) {
        const html = this.toHtml(user)
        document.body.insertAdjacentHTML('beforeend', html)
        document.body.append(this.backdrop)
        setTimeout(() => {
            document.body.addEventListener('click', this.boundClose)
        }, 0)
        this.setEventListeners()
    }

    close(event) {
        const modal = document.getElementById(this.type)        // Ищем открытое модальное окно
        if (event.target.classList.contains('backdrop') || event.target.id === 'close-btn') {
            modal.remove()                                      // Удаляем открытое модальное окно
            this.backdrop.remove()
            document.body.removeEventListener('click', this.boundClose)
        }
    }
}