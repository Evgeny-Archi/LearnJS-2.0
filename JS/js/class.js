window.addEventListener('DOMContentLoaded', () => {
    'use strict';
// Практика с конструкторами
//     function User(name, id) {
//         this.name = name;
//         this.id = id;
//         this.human = true;
//         this.hello = function() {
//             console.log(`hello ${this.name}`)
//         }
//     }
//     User.prototype.exit = function() {
//         console.log('Exit ' + this.name)
//     }
//     const ivan = new User('Ivan', 1);
//     const alex = new User('alex', 2);
//
//     // Класс
//     class User {
//         constructor(name, id) {
//             this.name = name;
//             this.id = id;
//         }
//         hello() {
//             console.log('hello' + this.name)
//         }
//     }
//
//     // Задачки
//     function Calc() {
//         this.read = function() {
//             this.one = +prompt('Insert one', '');
//             this.two = +prompt('Insert two', '');
//         }
//         this.sum = function() {
//             return this.one + this.two;
//         }
//         this.mull = function() {
//             return this.one * this.two;
//         }
//     }
//     let calc = new Calc();
//     calc.read();
//     console.log(calc.sum())
//
//     function Acc(startValue) {
//         this.value = startValue;
//         this.read = function() {
//             this.value += +prompt('Value', 0);
//         }
//     }
//     let acc = new Acc(1);
//     acc.read();
//     acc.read();
//     console.log(acc.value)

// Модальное окно
    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.modal-close');

    more.addEventListener('click', function() {
        overlay.classList.remove('fade');
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', function() {
        overlay.classList.add('fade');
        document.body.style.overflow = '';
    })
})

