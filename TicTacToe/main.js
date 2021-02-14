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
                return 'Победили крестики'
            } else if (checkfield(i, 'O')) {
                this.stopGame()
                return 'Победили нолики'
            }
        }

        // Макс. кол-во шаг = ничья
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

    // Показывает победителя
    showResult() {
        this.out.innerHTML += `<p class="out-result">${this.result}<button class="btn">Начать заново</button></p>`
    }

    // Показывает ход игры
    showMove(event) {
        const step = this.makeMove(event.target)
        event.target.innerHTML = step

        this.out.innerHTML += `<p class="out-list">Ход: ${this.move}</p>`
        if (this.checkWin() !== undefined) {
            this.result = this.checkWin()
            this.showResult()
        }
    }

    // Обновляем игру
    resetGame() {
        this.boxes.forEach(item => item.textContent = '')
        this.move = 0
        this.result = null
        this.out.innerHTML = ''
        tictac.wrap.addEventListener('click', listener)
    }
}

const tictac = new View('.wrap')

const listener = (event) => { // Фу-ция для удаления слушателя после завершения игры
    tictac.showMove(event)
}

const resetHAndler = (event) => {
    if (event.target.classList.contains('btn')) {
        tictac.resetGame()
    }
}

tictac.wrap.addEventListener('click', listener)
document.querySelector('.out').addEventListener('click', resetHAndler)
    
