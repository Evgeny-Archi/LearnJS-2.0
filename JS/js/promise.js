// Promise Practise

// Callback
// function f1(str, cb) {
//     cb(2)
//     return str + 'world'
// }
// function f2(num) {
//     console.log(num + 2)
// }
// console.log(f1('hello', f2))

// setTimeout через Promise
// function delay(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms))
// }
// delay(1000).then(() => {
//     console.log('1 sec last');
// })

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