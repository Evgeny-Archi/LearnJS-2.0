// https://developer.mozilla.org/ru/docs/Web/Events
let btn = document.querySelector('button');
let wrap = document.querySelector('.wrap');
btn.onclick = function() { // Можно назначить только один обработчик
    //alert('yes')
}
// про event https://developer.mozilla.org/ru/docs/Web/API/Event
btn.addEventListener('click', function(event) {
    console.log(event.target)
})
btn.addEventListener('mouseenter', function() {
    btn.style.background = "red";
})
// Всплытие. Expected result: target - btn
wrap.addEventListener('click', function(event) {
    console.log(event.target)
})

// Делегирование
let table = document.querySelector('.table'),
    td = document.querySelectorAll('.td'),
    selected; // Переменная хранит данные о предыдущем нажатии и если она не пустая, то класс active у нее удаляется. (замыкание)

table.addEventListener('click', (event) => {
    let target = event.target;
    if (!target.classList.contains('td')) return; // Если клик мимо ячейки - завершаем
    highlight(target);
})

let highlight = function(td) {
    if (selected) { // Если переменная не пустая и содержит данные из замыкания, то удаляем класс
        selected.classList.remove('active');
    }
    selected = td; // Присваиваем переменной ссылку на нажатую ячейку
    selected.classList.add('active');
}
