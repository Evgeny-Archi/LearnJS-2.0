import { EventEmitter, createElement } from "./helper"

class View extends EventEmitter {
    constructor() {
        super()
        this.todoForm = document.getElementById('todo-form')
        this.addInput = this.todoForm.querySelector('#add-input')
        this.list = document.getElementById('todo-list')

        this.todoForm.addEventListener('submit', this.handleAdd.bind(this))
    }

    createElements(todo) {
        const checkbox = createElement('input', {type: 'checkbox', className: 'checkbox', checked: todo.completed ? 'checked' : ''})
        const label = createElement('label', {className: 'title'}, todo.title)
        const editInput = createElement('input', {type: 'text', className: 'textfield'})
        const editButton = createElement('button', {className: 'edit'}, 'Изменить')
        const removeButton = createElement('button', {className: 'remove'}, 'Удалить')
        const item = createElement('li', {
            className: `todo-item${todo.completed ? ' completed' : ''}`,
            'data-id': todo.id
            },
            checkbox,
            label,
            editInput,
            editButton,
            removeButton)

        this.addEventListeners(checkbox, editButton, removeButton)
        return item
    }

    addEventListeners(checkbox, editButton, removeButton) {
        checkbox.addEventListener('change', this.handleToggle.bind(this))
        editButton.addEventListener('click', this.handleEdit.bind(this))
        removeButton.addEventListener('click', this.handleRemove.bind(this))
    }

    handleAdd(event) {
        event.preventDefault()
        if (!this.addInput.value) return
        this.emit('add', this.addInput.value)
    }

    handleToggle({ target }) {
        const listItem = target.parentNode
        const completed = target.checked
        const id = listItem.getAttribute('data-id')
        this.emit('toggle', {id, completed})
    }

    handleEdit({ target }) {
        const listItem = target.parentNode
        const id = listItem.getAttribute('data-id')
        const labelText = listItem.querySelector('.title').textContent
        const input = listItem.querySelector('.textfield')
        const editButton = listItem.querySelector('button.edit')

        if (listItem.classList.contains('editing')) {
            const title = input.value
            this.emit('edit', { id, title })
        } else {
            listItem.classList.add('editing')
            input.value = labelText
            editButton.textContent = 'Сохранить'
        }
    }

    handleRemove({ target }) {
        const listItem = target.parentNode
        const id = listItem.getAttribute('data-id')

        this.emit('remove', id)
    }

    addItem(todo) {
        const listItem = this.createElements(todo)
        this.addInput.value = ''
        this.list.appendChild(listItem)
    }

    findListItem(id) {
        return this.list.querySelector(`[data-id="${id}"]`)
    }

    toggleItem(todo) {
        const listItem = this.findListItem(todo.id)
        const checkbox = listItem.querySelector('.checkbox')
        checkbox.checked = todo.completed

        if (todo.completed) {
            listItem.classList.add('completed')
        } else {
            listItem.classList.remove('completed')
        }
    }

    editItem(todo) {
        const listItem = this.findListItem(todo.id)
        const label = listItem.querySelector('.title')
        const input = listItem.querySelector('.textfield')
        const editButton = listItem.querySelector('button.edit')

        label.textContent = input.value
        editButton.textContent = 'Изменить'
        listItem.classList.remove('editing')
    }

    removeItem(id) {
        const listItem = this.findListItem(id)
        this.list.removeChild(listItem)
    }

    show(todo) {
        todo.forEach(item => {
            const listItem = this.createElements(item)

            this.list.appendChild(listItem)
        })
    }
}

export default View