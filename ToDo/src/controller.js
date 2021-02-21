class Controller {
    constructor(model, view) {
        this.model = model
        this.view = view

        view.on('add', this.addTodo.bind(this))
        view.on('toggle', this.toggleTodo.bind(this))
        view.on('edit', this.editTodo.bind(this))
        view.on('remove', this.removeTodo.bind(this))

        view.show(model.state)
    }

    addTodo(title) {
        const todo = this.model.addItem(title) // Передаем текст в модель, где формируется объект todo и возвращается
        this.view.addItem(todo)
    }

    toggleTodo({ id, completed }) {
        const todo = this.model.updateItem(id, { completed })
        this.view.toggleItem(todo)
    }

    editTodo({ id, title }) {
        const todo = this.model.updateItem(id, { title })
        this.view.editItem(todo)
    }

    removeTodo(id) {
        this.model.removeItem(id)
        this.view.removeItem(id)
    }
}

export default Controller