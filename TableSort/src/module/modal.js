import { EventEmitter } from "./utils"

export class Modal extends EventEmitter {
    constructor(type) {
        super()
        this.type = type        // Принимаем тип модального окна (кнопки: more info, edit). Тип соответствует id DOM элемента
        this.modal = null       // Нужен для хранения DOM элемента открытой модалки. Через эту переменную можно обращаться к внутренним элементам в классах-наследниках
        this.backdropTemplate = document.getElementById('backdrop').content.cloneNode(true)
        this.backdrop = this.backdropTemplate.querySelector('.backdrop')

        this.boundClose = this.close.bind(this)
    }

    show(user) {
        const html = this.toHtml(user)
        document.body.insertAdjacentHTML('beforeend', html)
        document.body.append(this.backdrop)
        this.modal = document.getElementById(this.type)     // Ищем открытое модальное окно и добавляем в переменную для использования в наследниках

        setTimeout(() => {          // Откладываем добавление обработчика событий на закрытие, чтобы модальное окно сразу не закрылось
            document.body.addEventListener('click', this.boundClose)
        }, 0)
        this.setEventListeners()    // Добавляем другие обработчики, если они определены в наследниках
    }

    close(event) {
        if (event.target.classList.contains('backdrop') || event.target.id === 'close-btn') {
            this.modal.remove()                                      // Удаляем открытое модальное окно
            this.modal = null                                        // Убираем DOM элемент модалки из переменной
            this.backdrop.remove()                                   // Удаляем подложку
            document.body.removeEventListener('click', this.boundClose)
        }
    }
}