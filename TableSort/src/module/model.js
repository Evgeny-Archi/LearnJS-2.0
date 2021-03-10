import {load, EventEmitter} from './utils'

export class Model extends EventEmitter {
    constructor() {
        super()
        this.state = []
    }

    get modelState() {
        return this.state
    }

    set modelState(value) {
        if (Array.isArray(value)) {
            this.state = value
        }
    }

    fixCompanyName(data) {
        data.forEach(user => {
            user.company = user.company.name
        })
    }

    async getUsers() {
        try {
            const data = await load()
            this.fixCompanyName(data)       // Убираем ненужные поля в объекте company и оставляем только название компании
            this.modelState = data
            return this.modelState
        } catch(error) {
            throw new Error(error)
        }

    }
}