import { getInitials } from "./utils"
import { Modal } from './modal'

export class ModalAbout extends Modal {
    constructor() {
        super('about-modal')
    }

    toHtml(user) {
        return `
            <div class="modal-wrap" id="about-modal">
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
                            <div class="modal_content-row">
                                <div class="modal_content-cel">Company</div>
                                <div class="modal_content-cel">${user.company}</div>
                            </div>
                        </div>
                    </div>
                    <div class="model_footer">
                        <button class="btn" id="close-btn">Close</button>
                    </div>
                </div>
            </div>
        `
    }

    setEventListeners() {}
}