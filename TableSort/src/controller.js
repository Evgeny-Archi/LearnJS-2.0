import {cacheDecorator} from './module/utils'

export class Controller {
    constructor(model, view, popup, about, edit) {
        this.model = model
        this.view = view
        this.popup = popup
        this.about = about
        this.edit = edit

        view.on('loadUsers', this.loadUsers.bind(this))
        view.on('setNodes', this.setNodesToModelState.bind(this))
        view.on('filter', this.filtering.bind(this))
        view.on('sort', this.sorting.bind(this))
        view.on('showPopup', this.showPopup.bind(this))

        popup.on('changeContactInfo', this.changeContacts.bind(this))
        popup.on('sort', this.sorting.bind(this))
        popup.on('showAboutModal', this.showAboutModal.bind(this))
        popup.on('deleteUser', this.deleteUser.bind(this))
        popup.on('showEditModal', this.showEditModal.bind(this))

        edit.on('saveEdit', this.editUser.bind(this))
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

    filtering({filter, inputType}) {
        if (!this.model.modelState.length) return
        const filterData = this.model.filtering(filter)     // Получаем отфильтрованные данные
        this.view.filterRow(filterData, inputType)          // Передаем их представлению и отрисовываем строки по фильтру
    }

    sorting({target, order}) {
        const sortedData = this.model.sorting(target)
        if (order === 'ascend') sortedData.reverse()
        this.view.sortRow(sortedData)
    }

    showPopup({event, id}) {
        this.popup.show(event, this.popup.popupInfo, id)
    }

    changeContacts(id) {
        const typeContact = this.model.getContacts(id)
        this.view.changeContactList(typeContact, id)
    }

    showEditModal(id) {
        const user = this.model.getUserById(id)
        this.edit.show(user)
    }

    editUser(data) {
        this.edit.setPreloaderBtn()
        const user = this.model.updateState(data)
        user            // Получаем промис, т.к. эмулируется задержка обновления данных (ради практики)
            .then((result) => {
                this.view.updateUserRow(result)
                this.edit.forceClose()
            })
    }

    showAboutModal(id) {
        this.model.getUserById = cacheDecorator(this.model.getUserById)
        const user = this.model.getUserById(id)
        this.about.show(user)
    }

    deleteUser(id) {
        try {
            const deleteNode = this.model.delete(id)
            this.view.deleteUserRow(deleteNode)
            if (this.model.modelState.length === 0) {
                // Если удалить всех пользователей, то вызываем render с пустым массивом (появляется заглушка и отключаются кнопки) 
                this.view.renderUsers(this.model.modelState)
            }
        } catch(error) {
            alert(error)
        }
    }
}