import {EventEmitter} from './utils'

export class Popup extends EventEmitter {
    constructor() {
        super()
        this.sortEmailBtn = document.getElementById('email-btn')
        this.popupTemplate = document.querySelector('#popup').content.cloneNode(true)
        this.popup = this.popupTemplate.querySelector('.tip-menu')
        this.isOpen = false

        this.sortEmailBtn.addEventListener('click', this.show.bind(this))
        document.body.addEventListener('click', (event) => {
            if (!event.target.closest('.tip-menu') && this.isOpen) {
                this.close()
            }
        })
    }

    show({target}) {
        if (!this.isOpen) {
            const coordinate = target.getBoundingClientRect()

            this.popup.style.left = coordinate.x + 'px'
            this.popup.style.top = coordinate.y + 26 + 'px'

            document.body.append(this.popup)
            setTimeout(() => {
                this.isOpen = true
            }, 0)
        } else {
            this.close()
        }
    }

    close() {
        this.popup.remove()
        this.isOpen = false
    }
}