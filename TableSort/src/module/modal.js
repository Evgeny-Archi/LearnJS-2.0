import { EventEmitter, getInitials } from "./utils"

export class Modal extends EventEmitter {
    constructor() {
        super()
        this.backdropTemplate = document.getElementById('backdrop').content.cloneNode(true)
        this.backdrop = this.backdropTemplate.querySelector('.backdrop')

        this.boundClose = this.close.bind(this)
    }

    toHtml(user) {
        return `
            <div class="modal-wrap">
                <div class="modal">
                    <div class="modal_title">
                        <span class="modal_title-logo" style="background: ${user.color}">${getInitials(user.name)}</span>
                        <h2 class="modal_title-fullname">${user.name}</h2>
                    </div>
                    <div class="modal_content">
                        <div class="modal_content-table">
                            <div class="modal_content-row">
                                <div class="modal_content-cel">id</div>
                                <div class="modal_content-cel">${user.id}</div>
                            </div>
                            <div class="modal_content-row">
                                <div class="modal_content-cel">Nickname</div>
                                <div class="modal_content-cel">${user.username}</div>
                            </div>
                            <div class="modal_content-row">
                                <div class="modal_content-cel">Email</div>
                                <div class="modal_content-cel">${user.email}</div>
                            </div>
                            <div class="modal_content-row">
                                <div class="modal_content-cel">Phone</div>
                                <div class="modal_content-cel">${user.phone}</div>
                            </div>
                            <div class="modal_content-row">
                                <div class="modal_content-cel">Address</div>
                                <div class="modal_content-cel">${user.address.zipcode}, ${user.address.city}, ${user.address.street}</div>
                            </div>
                            <div class="modal_content-row">
                                <div class="modal_content-cel">Website</div>
                                <div class="modal_content-cel">${user.website}</div>
                            </div>
                        </div>
                    </div>
                    <div class="model_footer">
                        <button class="modal_footer-close">Close</button>
                    </div>
                </div>
            </div>
        `
    }

    show(user) {
        const html = this.toHtml(user)
        document.body.insertAdjacentHTML('beforeend', html)
        document.body.append(this.backdrop)
        setTimeout(() => {
            document.body.addEventListener('click', this.boundClose)
        }, 0)
    }

    close(event) {
        const modal = document.querySelector('.modal-wrap')
        if (!event.target.closest('.modal-wrap') || event.target.classList.contains('modal_footer-close')) {
            modal.remove()
            this.backdrop.remove()
            document.body.removeEventListener('click', this.boundClose)
        }
    }
}