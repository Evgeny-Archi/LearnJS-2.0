export class Controller {
    constructor(model, view, popup) {
        this.model = model
        this.view = view
        this.popup = popup

        view.on('loadUsers', this.loadUsers.bind(this))
        view.on('setNodes', this.setNodesToModelState.bind(this))
        view.on('filter', this.filtering.bind(this))
        view.on('sort', this.sorting.bind(this))

        // popup.on('show-popup', () => console.log('show popup'))
    }

    loadUsers() {
        const preloader = this.view.setPreloader()      // Включаем анимацию загрузки
        const data = this.model.getUsers()              // Получаем данные пользователей
        data
            .then((result) => {
            this.view.removePreloader(preloader)        // Удаляем анимацию загрузки
            this.view.renderUsers(result)               // Показываем пользователей
            })
            .catch(error => {
                this.view.showError(error)
            })
    }

    setNodesToModelState(tempNodes) {
        this.model.setNodes(tempNodes)
    }

    filtering({ filter, inputType }) {
        if (!this.model.modelState.length) return
        const filterData = this.model.filtering(filter)     // Получаем отфильтрованные данные
        this.view.filterRow(filterData, inputType)          // Передаем их представлению и отрисовываем строки по фильтру
    }

    sorting({target, order}) {
        const sortedData = this.model.sorting(target)
        if (order === 'ascend') sortedData.reverse()
        this.view.sortRow(sortedData)
    }
}