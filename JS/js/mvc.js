// Simple app with MVC pattern
window.addEventListener('load', () => {
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

    class Controller {
        constructor(model, view) {
            this._model = model
            this._view = view

            view.on('addButtonClicked', () => {this.addItem()})
            view.on('delButtonClicked', () => {this.delItem()})
            view.on('listModified', (index) => {this.updateSelected(index)})
        }
        addItem() {
            const item = window.prompt('Add item:', '')
            if (item) {
                this._model.addItem(item)
            }
        }
        delItem() {
            const index = this._model.selectedIndex
            if (index !== -1) {
                this._model.delItem(index)
            }
        }
        updateSelected(index) {
            this._model.selectedIndex = index
        }
    }

    class Model extends EventEmitter {
        constructor(items = []) {
            super()
            this._items = items
            this._selectedIndex = -1
        }
        getItems() {
            return this._items.slice()
        }
        addItem(item) {
            this._items.push(item)
            this.emit('itemAdded', item)
        }
        delItem(index) {
            const item = this._items.splice(index, 1)[0]
            this.emit('itemDeleted', item)
        }
        get selectedIndex() {
            return this._selectedIndex
        }
        set selectedIndex(index) {
            this._selectedIndex = index
        }
    }

    class View extends EventEmitter {
        constructor(model, elements) {
            super()
            this._model = model
            this._elements = elements

            model.on('itemAdded', () => {this.renderList()})
            model.on('itemDeleted', () => {this.renderList()})

            this._elements.list.addEventListener('change', (e) => this.emit('listModified', e.target.selectedIndex))
            this._elements.addButton.addEventListener('click', () => this.emit('addButtonClicked'))
            this._elements.delButton.addEventListener('click', () => this.emit('delButtonClicked'))
        }
        show() {
            this.renderList()
        }
        renderList() {
            const list = this._elements.list
            list.selectedIndex = 1
            list.options.length = 0
            this._model.getItems().forEach(item => list.options.add(new Option(item)))
            this._model.selectedIndex = -1
        }
    }

    const listModel = new Model(['JS', 'React', 'Angular'])
    const listView = new View(listModel, {
        'list': document.getElementById('list'),
        'addButton': document.getElementById('plusBtn'),
        'delButton': document.getElementById('minusBtn')
    })
    const listController = new Controller(listModel, listView)

    listView.show()

})

/* Some tips */
// Controller - передаются model и controller для взаимодействия между ними
// Model - работает только с данными, не знает про model и view
// View - передается model для их отображения

// Реализация метода on() EventEmitter
// const obj = {}                                   // Пустой объект для добавления слушателей
// const name = 'test'                              // Имя слушателя
// const fn = () => {}                              // Слушатель
// // (obj[name] || (obj[name] = [])).push(fn)      // Тоже самое, что и ниже с условием
// if (!obj[name]) {                                // Если в объекте нет слушателя с таким именем, то создается пустой массив, в который добавляется слушатель
//     obj[name] = []
// }
// obj[name].push(fn)
// console.log(obj)

// Что хранится в _events EventEmitter:
// this._events = {
//     'addButtonClicked': [() => {console.log('1')}, () => {console.log('2')}] // В таком формате хранятся фу-ции с их именами
// }

// Реализация метода emit() EventEmitter
// const obj = {
//     'addSomething': [firstFunc, secondFunc],
//     'anotherLsn': [<empty array>]
// }
// const nameEvent = 'addSomething'
// const event = obj[nameEvent]                             // Получаем массив фу-ций по свойству объекта
// if (event) {                                             // Если он есть
//     event.slice().forEach(lsn => lsn.call(null, args))   // Перебираем массив и выполняем каждую фу-цию с передаными аргументами
// }

