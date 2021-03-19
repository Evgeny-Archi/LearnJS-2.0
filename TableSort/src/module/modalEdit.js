import {getInitials} from './utils'
import {Modal} from './modal'

export class ModalEdit extends Modal {
    constructor() {
        super('edit')

        this.setEventListeners()
    }

    toHtml(user) {
        const rowCoordinate = user.node.getBoundingClientRect()
        return `
        <div class="tr-editing-wrap" style="top: ${rowCoordinate.y}px; left: ${rowCoordinate.x - 20}px;" id="edit">
            <div class="tr-editing" style="width: ${rowCoordinate.width}px">
                <div class="td-editing">
                    <span class="name-icon" style="background: ${user.color};">${getInitials(user.name)}</span>
                    <span class="js-user"><input type="text" placeholder="Name..." class="edit-input" value="${user.name}" autofocus="autofocus"></span>
                </div>
                <div class="td-editing"><input type="text" placeholder="Username..." class="edit-input" value="${user.username}"></div>
                <div class="td-editing"><input type="text" placeholder="Email..." class="edit-input" value="${user.email}"></div>
                <div class="td-editing"><input type="text" placeholder="Company..." class="edit-input" value="${user.company}"></div>
            </div>
            <div class="td-btns">
                <button class="btn btn-save" id="save">Сохранить</button>
                <button class="btn btn-cancel" id="close-btn">Отменить</button>
            </div>
        </div>
        `
    }

    setEventListeners() {
        this.saveBtn = document.getElementById('save')
        if (this.saveBtn) {
            this.saveBtn.addEventListener('click', () => {
                console.log('save');
            })
        }
    }
}