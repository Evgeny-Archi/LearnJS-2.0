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
});
btn.addEventListener('click', () => { // this = window
    console.log(this)
});

// Моментальный вызов фу-ции
(function(str) {
    console.log(str)
})('hi')

let test = {
    i: 1,
    foo: function() {
        console.log(this) // объект
        function foo2() {
            console.log(this) // window. Внутренняя фу-ция не привязана к контексту объекта
        }
        return foo2()
    }
}
console.log(test.foo());

// Фу-ция конструктор
function Country(name, traveled) {
    this.name = name ? name : 'Russia';
    this.traveled = Boolean(traveled);
}
Country.prototype.travel = function() {
    this.traveled = true;
    console.log(this)
}

let france = new Country('France', false);
france.travel()
console.log(france) // this = фу-ция конструктор с аргументами france

let usa = new Country;
usa.travel()
console.log(usa) // this = фу-ция конструктор с аргументами usa
console.log(france.prototype == usa.prototype) // true


// // Контекст вызова this = Foo
function Foo(str) {
    console.log(this)
    this.property = str;
}

let foo2 = new Foo('foo2');
let foo3 = new Foo('foo3');
console.log(foo2.property)
console.log(foo3.property)
