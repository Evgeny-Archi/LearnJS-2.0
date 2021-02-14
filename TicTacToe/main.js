// Tic Tac Toe game
class Controller {
    constructor(wrap) {
        this.wrap = document.querySelector(wrap)
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
    makeMove(event) {
        const box = event.target
        if (box.classList.contains('box')) {
            if (!this.checkCollision(box)) { // Проверяем на повторное нажатие на одно поле
                return
            }
            box.innerHTML = (this.move % 2 === 0) ? 'X' : 'O'
            this.move++
        }
        // this.checkWin()
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
        const checkfield = (item, field) => {
            return this.boxes[item[0]].textContent === field && this.boxes[item[1]].textContent === field && this.boxes[item[2]].textContent === field
        }
    
        this.wins.map(item => {
            if (checkfield(item, 'X')) {
                this.wrap.removeEventListener('click', listener)
                return 'X'
            } else if (checkfield(item, 'O')) {
                this.wrap.removeEventListener('click', listener)
                return 'O'
            }
        })
    }
}

class View extends Controller {
    constructor(wrap) {
        super(wrap)
        this.out = document.querySelector('.out')
    }

    showResult() {
        console.log(this.checkWin())
    }

    showMove(event) {
        this.makeMove(event)
        this.out.textContent = this.move
        this.showResult()
    }
}

const tictac = new View('.wrap')

const listener = (event) => { // Фу-ция для удаления слушателя после завершения игры
    tictac.showMove(event)
}

tictac.wrap.addEventListener('click', listener)
    
