export async function load() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        if (!response.ok) throw new Error('Ошибка сети')
        const data = await response.json()
        return data
    } catch {
        throw new Error('Не удалось получить данные от сервера')
    }
}

export class EventEmitter {
    constructor() {
        this.events = {}
    }

    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = []
        }
        this.events[event].push(listener)
    }

    emit(event, args) {
        const evt = this.events[event]
        if (evt) {
            evt.slice().forEach(lsn => lsn.call(null, args))
        }
    }
}

export function isObject(obj) {
    return obj === Object(obj)
}

export function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

export function getInitials(name) {
    return name.split(' ').slice(0, 2).map(item => item.charAt(0).toUpperCase()).join('')
}