class EventEmitter {
    constructor() {
        this._events = {}
    }
    on(evt, listener) {
        if (!this._events[evt]) {
            this._events[evt] = []
        }
        this._events[evt].push(listener)
    }

    emit(evt, args) {
        const event = this._events[evt]
        if (event) {
            event.slice().forEach(lsn => lsn.call(null, args))
        }
    }
}

function createElement(tag, props, ...children) {
    const elem = document.createElement(tag)

    Object.keys(props).forEach(key => {
        if (key.startsWith('data-')) {
            elem.setAttribute(key, props[key])
        } else {
            elem[key] = props[key]
        }
    })

    children.forEach(child => {
        if (typeof child === 'string') {
            child = document.createTextNode(child)
        }
        elem.appendChild(child)
    })

    return elem
}

// Получаем задачи из хранилища для передачи модели
function load () {
    const string = localStorage.getItem('todo')
    const data = JSON.parse(string)

    return data
}

export { EventEmitter, createElement, load }