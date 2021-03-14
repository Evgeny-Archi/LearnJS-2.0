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

    get filteredData() {
        return this.filteredState
    }

    set filteredData(value) {
        if (Array.isArray(value)) {
            this.filteredState = value
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

    setNodes(tempNodes) {
        this.modelState.forEach((item, i) => {
            item.node = tempNodes[i]
        })
    }

    filtering(filter) {
        this.filteredData = this.modelState.filter(user => {
            return user.name.toLowerCase().includes(filter)
        })
        return this.filteredData
    }

    sorting(target) {
        // Смотрим есть ли отфильтрованные данные, если есть, то сортировку делаем по ним
        const sortedData = (this.filteredData) ? this.filteredData : this.modelState
        let value = null

        switch(target.id) {
            case 'user-btn':
                value = 'username'
                break
            case 'email-btn':
                value = 'email'
                break
            case 'company-btn':
                value = 'company'
                break
        }

        sortedData.sort((a, b) => {
            a = a[value].trim().toLowerCase()
            b = b[value].trim().toLowerCase()
            if (a > b) return 1
            if (a < b) return -1
            return 0
        })

        return sortedData
    }
}