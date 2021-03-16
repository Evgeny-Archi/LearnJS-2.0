import { EventEmitter } from "./utils"

export class Modal extends EventEmitter {
    constructor() {
        super()
    }

    toHtml(user) {
        return `
            <div class="modal-wrap">
                <div class="modal">
                    <div class="modal_title">
                        <span class="modal_title-logo">GR</span><h2 class="modal_title-fullname">Glenna Reichert</h2>
                    </div>
                    <div class="modal_content">
                        <div class="modal_content-table">
                            <div class="modal_content-row">
                                <div class="modal_content-cel">id</div>
                                <div class="modal_content-cel">12</div>
                            </div>
                            <div class="modal_content-row">
                                <div class="modal_content-cel">Nickname</div>
                                <div class="modal_content-cel">Delphine</div>
                            </div>
                            <div class="modal_content-row">
                                <div class="modal_content-cel">Email</div>
                                <div class="modal_content-cel">Julianne.OConner@kory.org</div>
                            </div>
                            <div class="modal_content-row">
                                <div class="modal_content-cel">Phone</div>
                                <div class="modal_content-cel">1-770-736-8031 x56442</div>
                            </div>
                            <div class="modal_content-row">
                                <div class="modal_content-cel">Address</div>
                                <div class="modal_content-cel">690069, McKenziehaven, Douglas Extension</div>
                            </div>
                            <div class="modal_content-row">
                                <div class="modal_content-cel">Website</div>
                                <div class="modal_content-cel">hildegard.org</div>
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
}