export class Controller {
    constructor(model, view) {
        this.model = model
        this.view = view

        view.on('loadUsers', this.loadUsers.bind(this))
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

}