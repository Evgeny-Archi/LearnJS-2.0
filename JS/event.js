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
