// Всякие задачки по JS

// const btn = document.querySelector('button'),
//       out = document.querySelector('.count'),
//       text = document.querySelector('#text');
// let textCount = document.querySelector('.text-count');

// // Считалка
// btn.addEventListener('click', () => {
//     let count = 0;
//     setInterval(() => {
//         count++;
//         out.textContent = count;
//     }, 1000)
// });

// // Считалка текста
// text.addEventListener('input', () => {
//     textCount.textContent = text.value.length;
// })

// // Считалка input
// let initialValue = 0;
// const total = [...document.querySelectorAll('.js-input')].reduce((accumulator, currentValue) => {
//     return accumulator + currentValue.dataset.price * currentValue.value;
// }, initialValue);
// console.log(total)

// // Деструктуризация
// // массива
// let arr = [1, 2, 3]
// let [one, two, ...ather] = arr
// console.log(one, two, ather);

// // объекта
// let obj = {
//     one: 1,
//     two: 2,
//     three: 3
// }
// let {one, two, three} = obj
// console.log(one, two, three);

// // Статические сво-ва и методы. Подсчет кол-ва созданных объектов и дата последнего создания
// function Article() {
//     this.created = new Date();

//     Article.count++
//     Article.last = this.created
// }
// Article.count = 0; // Доступно только в фу-ции конструкторе. Есть в прототипе объекта при создании такового, но нет доступа к нему
// Article.showStats = function() {
//     console.log(`Всего: ${Article.count}. Последняя: ${Article.last}`);
// }
// new Article();
// new Article();
// new Article();
// Article.showStats();

// // Фу-ция принимает кол-во символов, которые должны быть в строке. Если строка меньше, недостающие символы заполняются вначале пробелами
// function leftPad(symbolsCount, str) {
//     if (symbolsCount <= str.length) return str;
//     let num = symbolsCount - str.length

//     Разделение на массив
//     let newstr = str.split('')
//     while (num > 0) {
//         newstr.unshift(' ')
//         num--;
//     }
//     return newstr.join('')

//     Конкатинация
//     let spaces = '';
//     while (num > 0) {
//         spaces += ' '
//         num--;
//     }
//     return spaces + str

//     Метод repeat()
//     return ' '.repeat(num) + str
// }
// console.log(leftPad(6, 'test')); // "  test"

// // Фу-ция возвращает объект с вложенными сво-вами из массива
// function objCreator(arr) {
//     if(!arr.length) return {}

//     const variable = arr.shift()

//     let obj = {}
//     obj[variable] = objCreator(arr)
//     return obj
//  // return { [variable]: objCreator(arr) }
// }
// console.log(objCreator(['a', 'b', 'c'])); // {a: {b: {c: {}}}}
// console.log(objCreator(['a', 'b', 'c', 'd'])); // {a: {b: {c: {d: {}}}}}
// console.log(objCreator([])); // {}

// // Преобразование строки
// function accum(str) {
//     return [...str].map((item, index) => {
//         return item.toUpperCase() + item.repeat(index + 1)
//     }).join('-')
// }

// console.log(accum('abcd')); // A-Bb-Ccc-Dddd
// console.log(accum('HfiAjq')); // H-Ff-Iii-Aaaa-Jjjjj-Qqqqqq

// // Сумма чисел
// function sumTo(n) { // Рекурсия
//     if (n === 1) return n
//     return n + sumTo(n - 1)
// }
// function sumTo(n) { // Арифметическая прогрессия
//     return n * (n + 1) / 2
// }

// console.log(sumTo(1)); // 1
// console.log(sumTo(2)); // 2 + 1
// console.log(sumTo(4)); // 4 + 3 + 2 + 1

// // Вывод значений связанного списка
// let list = {
//     value: 1,
//     next: {
//       value: 2,
//       next: {
//         value: 3,
//         next: {
//           value: 4,
//           next: null
//         }
//       }
//     }
//   };
//   function printList(list) {
//       let tmp = list
//       while(tmp) {
//           console.log(tmp.value);
//           tmp = tmp.next
//       }
//   }
//  printList(list)

// // Вывод чисел Фибоначчи
// function fib(n) {
//   let arr = [1];
//   let i = 0;
//   while (n) {
// 	if (i === 0) {
// 		arr.push(i + 1)
// 	} else {
// 		let left = arr[i - 1]
// 		let right = arr[i]
// 		arr.push(left + right)
// 	}
// 	i++
//     n--;
//   }
//   return arr
// }

// console.log(fib(3));
// console.log(fib(7));

/*
1. Переписать на ES6.
2. Нужно вернуть значение из метода после 2-х секунд.
*/
// var john = {
//   name: 'John Doe',
//   balance: 1500,
//   deduct: function(amount) {
//     this.balance = this.balance - amount;
//     return this.name + ' has a balance of ' + this.balance;
//   },
// };

// console.log(john.deduct(200));

// // Выбирает имена из объектов массива и объединяет в строку, разделенными запятой. Последние два имени разделены амперсандом
// function list(names) {
//     if (!names.length) return ' '
//     if (names.length === 2) return names.map((item) => item.name).join(' & ')

//     let arrNames = []
//     for (let item of names) {
//         arrNames.push(item.name)
//     }
//     let strNames = ''
//     arrNames.forEach((item, index) => {
//         if (index < arrNames.length - 2) {
//             strNames += item + ', '
//         } else if (index === arrNames.length - 1) {
//             strNames += item
//         } else {
//             strNames += item + ' & '
//         }
//     })
//     return strNames

//     // return names.map((item) => {
//     //     return item.name
//     // }).join(', ').replace(/,(?![^,]*,)/m, ' &')
// }

// console.log(list([{name: 'Bart'}, {name: 'Lisa'}, {name: 'Edy'}, {name: 'John'}, {name: 'Edy'}, {name: 'John'}]));
// console.log(list([{name: 'Bart'}, {name: 'Lisa'}, {name: 'Edy'}, {name: 'John'}]));
// console.log(list([{name: 'Bart'}, {name: 'Lisa'}, {name: 'Edy'}]));
// console.log(list([{name: 'Bart'}, {name: 'Lisa'}]));
// console.log(list([{name: 'Bart'}]));
// console.log(list([]));

// // Вывод номера телефона по шаблону
// function createPhoneNumber(num) {
//     let str = '('
//     num.forEach((item, index) => {
//         if (index === 2) {
//             str += item + ') '
//         } else if (index === 5) {
//             str += item + '-'
//         } else {
//             str += item
//         }
//     })
//     return str
// }
// console.log(createPhoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0])) //(123) 456-7890

// // Фу-ция расчета кол-ва остановок на дистанции и вывод поэтапно
// function realizeDistance(distance, stopAfter) {
//     if (Math.floor(distance / stopAfter) < 2) {
//         return `Вы проехали ${distance} метров и доехали до точки`
//     } else {
//         let rezult = ''
//         let step = stopAfter
//         for (let i = 0; i < Math.floor(distance / stopAfter); i++) {
//             if (step >= distance) break;
//             rezult += `Остановка ${i + 1}. Вы проехали ${step} метров.\n`            
//             step += stopAfter
//         }
//         return `${rezult}Вы проехали еще ${distance - (step - stopAfter)} метров и доехали до точки.\n`
//     }
// }
// // Вы проехали 100 метров и доехали до точки
// console.log(realizeDistance(100, 150));
// /*
// Остановка 1. Вы проехали 300 м.
// Остановка 2. Вы проехали 600 м.
// Остановка 3. Вы проехали 900 м.
// Вы проехали еще 100 м. и доехали до точки
// */
// console.log(realizeDistance(1000, 300));

// // Возвращает макс и мин значения и разницу между ними
// function diffInAge(ages) {
//     let max = 0
//     let min = ages[0]
//     for (let i = 0; i < ages.length; i++) {
//         if (max < ages[i]) max = ages[i]
//         if (min > ages[i]) min = ages[i]
//     }
//     return [min, max, max-min]
// }
// console.log(diffInAge([82, 15, 6, 38, 35])); // [6, 82, 76]
// console.log(diffInAge([35, 15, 6, 38, 82])); // [6, 82, 76]
// console.log(diffInAge([57, 99, 14, 32])); // [14, 99, 85]

// // Возвращает эл массива, которые отличны от макс элемента не более чем на 10%
// function func(arr) {
//     let max = Math.max(...arr)
//     // let sort = []
//     // arr.map((item) => {
//     //     if (item > (max - ((max * 10) / 100)) && item !== max) {
//     //         sort.push(item)
//     //     }
//     // })
//     // return sort

//     return arr.filter((item) => item > (max - ((max * 10) / 100)) && item !== max)
// }
// console.log(func([5, 88, 95, 100, 77, 21, 92])); // [95, 92]
// console.log(func([2, 13, 55, 29, 19, 5, -5])); // []

// // Фу-ция добавляет в массив нули до размера переданного вторым аргументом
// function fillArr(arr, len) {
//     for (let i = 0; i <= len - arr.length; i++) {
//         arr.push(0)
//     }
//     return arr
// }
// const arr = [2, 6, 8]
// fillArr(arr, 5)
// console.log(arr); // [2, 6, 8, 0, 0] - size: 5

// // Возвращает уникальные элементы массива
// function unique(arr) {
//     // return Array.from(new Set(arr))

//     let sort = []
//     sort.push(arr[0])
//     for (let i = 1; i < arr.length; i++) {
//         if (!sort.includes(arr[i])) {
//             sort.push(arr[i])
//         }
//     }
//     return sort
// }
// console.log((unique([1, 8, 1, 5, 9, 5, 8]))); // [1, 8, 5, 9]

// // Фу-ция заполняет массив 100 случайными числами от 0 до 200
// function getRandom() {
//     let arr = []
//     arr.push(Math.floor(Math.random() * 200))
//     while (arr.length < 100) {
//         let random = Math.floor(Math.random() * 200)
//         if (!arr.includes(random)) {
//             arr.push(random)
//         }
//     }
//     return arr.sort()
// }
// console.log(getRandom());

// function sum(a, b) {
//     if (b) {
//         return a + b
//     }
//     return function(c) {
//         return a + c
//     }
// }
// console.log(sum(2)(3));

// Promise

// let drink = 0
// function shoot(arrow, headshot, fail) {
//     console.log(`Вы сделали выстрел из ${arrow}...`);
//     let promise = new Promise((resolve, reject) => {
//         setTimeout(() => {
//             return Math.random() > 0.5 ? resolve() : reject('Вы промахнулись')
//         }, 2000)
//     })
//     return promise
// }
// function win() {
//     console.log('вы победили');
//     (drink === 1) ? buyBeer() : giveMoney()
// }
// function buyBeer() {
//     console.log('Вам купили пиво');
// }
// function giveMoney() {
//     console.log('Вам заплатили');
// }
// function loose() {
//     console.log('вы проиграли');
// }
// shoot('лука')
//     .then(() => console.log('Вы попали в цель'))
//     .then(win)
//     .catch(loose)

// setTimeout через Promise
// function delay(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms))
// }
// delay(1000).then(() => {
//     console.log('1 sec last');
// })

// Фу-ция строит строку на основе объекта, где ключи это буквы, а значения - номер буквы в строке
// const input = {
//     ' ': [5],
//     d: [10],
//     e: [1],
//     H: [0],
//     l: [2, 3, 9],
//     o: [4, 7],
//     r: [8],
//     w: [6]
// }
// const buildString = (str) => {
//     if (typeof str !== 'object') return str
//     let arr = []
//     for (let key in str) {
//         str[key].map(item => arr[item] = key)
//     }
//     return arr.join('')
// }
// console.log(buildString(input));
// console.log(buildString('asdasd'));
// console.log(buildString(''));



