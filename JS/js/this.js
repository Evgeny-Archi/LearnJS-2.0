'use strict'

// При вызове фу-ции получаем в this - undefined (use strict), либо window
function showThis(a, b) {
    console.log(this);
    function sum() {
        console.log(this)
        return a + b;
    }
    console.log(sum())
}
showThis(1, 2);

// Метод объекта - this = объект
let obj = {
    a: 1,
    b: 2,
    sum: function() {
        console.log(this);
        function foo() {
            console.log(this)
        }
        foo() // Фу-ция, вызванная не как метод объекта будет иметь this = undefined c 'use strict' или window без
    }
}
obj.sum()

// Привязка this к контексту
let user = {
    name: "John"
}
function sayName(surname, id) {
    console.log(this);
    console.log(this.name, surname, id)
}
sayName.call(user, 'Smith', 12); // Принимет аргументы в виде строки
sayName.apply(user, ['Snow', 12]) // Принимает аргументы в виде массива

function count(number) {
    return this * number;
}

let double = count.bind(2); // Привязывает передаваемый аргумент к this (this = 2) и создает привязанную функцию
console.log(double(3))
console.log(double(5))

// Контекст в DOM
const btn = document.querySelector('button');
btn.addEventListener('click', function() { // this = button
    console.log(this)
})
btn.addEventListener('click', () => { // this = window
    console.log(this)
})
