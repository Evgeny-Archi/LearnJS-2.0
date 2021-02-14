// Tic Tac Toe game
class Controller {
    constructor() {
        this.wrap = document.querySelector('.wrap')
        this.boxes = this.wrap.querySelectorAll('.box')
        this.move = 0 // Считает ходы (четные - крестики, нечетные - нолики)
        this.wins = [ // Выигрышные комбинации
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
    }

    // Добавляем крестик или нолик в поле
    makeMove(box) {
        if (box.classList.contains('box')) {
            if (!this.checkCollision(box)) { // Проверяем на повторное нажатие на одно поле
                return
            }

            this.move++
            return (this.move % 2 === 0) ? 'O' : 'X'
        }
    }

    // Проверка на повторное нажатие на одно поле
    checkCollision(box) {
        if (box.textContent !== '') {
            return false
        }
        return true
    }

    // Проверяем победителя
    checkWin() {
        // Сравниваем поля с выигрышными комбинациями
        const checkfield = (i, field) => {
            return this.boxes[this.wins[i][0]].textContent === field && this.boxes[this.wins[i][1]].textContent === field && this.boxes[this.wins[i][2]].textContent === field
        }

        for (let i = 0; i < this.wins.length; i++) {
            if (checkfield(i, 'X')) {
                this.stopGame()
                return 'Win X'
            } else if (checkfield(i, 'O')) {
                this.stopGame()
                return 'Win O'
            }
        }

        if (this.move === 9) {
            this.stopGame()
            return 'Ничья'
        }
        // location.reload() // Перезагрузка страницы
    }

    // Останавливаем игру
    stopGame() {
        this.wrap.removeEventListener('click', listener)
    }
}

// Отображение хода игры и победителя
class View extends Controller {
    constructor(wrap) {
        super(wrap)
        this.out = document.querySelector('.out')
        this.result = null
    }

    showResult() {
        console.log(this.result)
    }

    showMove(event) {
        const step = this.makeMove(event.target)
        event.target.innerHTML = step

        this.out.textContent = this.move
        if (this.checkWin() !== undefined) {
            this.result = this.checkWin()
            this.showResult()
        }
    }
}

const tictac = new View('.wrap')

const listener = (event) => { // Фу-ция для удаления слушателя после завершения игры
    tictac.showMove(event)
}

tictac.wrap.addEventListener('click', listener)
    
