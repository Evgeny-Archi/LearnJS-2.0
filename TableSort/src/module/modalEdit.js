import {getInitials} from './utils'
import {Modal} from './modal'

export class ModalEdit extends Modal {
    constructor() {
        super('edit-modal')
        this.saveBtn = null
    }

    toHtml(user) {
        const rowCoordinate = user.node.getBoundingClientRect()
        return `
        <div class="tr-editing-wrap" style="top: ${rowCoordinate.y}px; left: ${rowCoordinate.x - 20}px;" id="edit-modal">
            <div class="tr-editing" style="width: ${rowCoordinate.width}px">
                <div class="td-editing">
                    <span class="name-icon" style="background: ${user.color};">${getInitials(user.name)}</span>
                    <span class="js-user"><input type="text" placeholder="Name..." class="edit-input" id="name" value="${user.name}" autofocus="autofocus"></span>
                </div>
                <div class="td-editing"><input type="text" placeholder="Username..." class="edit-input" id="username" value="${user.username}"></div>
                <div class="td-editing"><input type="text" placeholder="Email..." class="edit-input" id="email" value="${user.email}"></div>
                <div class="td-editing"><input type="text" placeholder="Company..." class="edit-input" id="company" value="${user.company}"></div>
            </div>
            <div class="td-btns">
                <button class="btn btn-save" id="${user.id}">Сохранить</button>
                <button class="btn btn-cancel" id="close-btn">Отменить</button>
            </div>
        </div>
        `
    }

    setEventListeners() {
        this.saveBtn = this.modal.querySelector('.btn-save')
        this.saveBtn.addEventListener('click', this.saveEdit.bind(this))
    }

    saveEdit({ target }) {
        const data = {}                 // Объект хранения измененных данных для передачи модели и представлению
        data.id = Number(target.id)     // Сохраняем id пользователя, полученного из кнопки
        this.modal.querySelectorAll('input[type="text"]').forEach(item => {
            data[item.id] = item.value
        })

        this.emit('saveEdit', data)
    }

    forceClose() {
        this.modal.remove()
        this.modal = null
        this.backdrop.remove()
        document.body.removeEventListener('click', this.boundClose)
    }

    setPreloaderBtn() {
        this.saveBtn.innerHTML = this.saveBtn.textContent + `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-notch" class="load-svg" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M288 39.056v16.659c0 10.804 7.281 20.159 17.686 23.066C383.204 100.434 440 171.518 440 256c0 101.689-82.295 184-184 184-101.689 0-184-82.295-184-184 0-84.47 56.786-155.564 134.312-177.219C216.719 75.874 224 66.517 224 55.712V39.064c0-15.709-14.834-27.153-30.046-23.234C86.603 43.482 7.394 141.206 8.003 257.332c.72 137.052 111.477 246.956 248.531 246.667C393.255 503.711 504 392.788 504 256c0-115.633-79.14-212.779-186.211-240.236C302.678 11.889 288 23.456 288 39.056z"></path></svg>`
    }
}