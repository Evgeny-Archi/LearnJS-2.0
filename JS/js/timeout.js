// Примеры таймаутов

// let timeId = setTimeout(func, 2000);
// clearTimeout(timeId);

// let timeId = setInterval(func, 3000);
// clearInterval(timeId);

// function func() {
//     alert('asd');
// }

// Рекурсия
// let timeId = setTimeout(function log() {
//     console.log('hi');
//     setTimeout(log, 2000)
// })

// Двигаем кубик по области
let btn = document.querySelector('.btn'),
    wrap = document.querySelector('.wrap'),
    box = document.querySelector('.box');

btn.addEventListener('click', animate);

// Получаем ширину и высоту элементов (квадратика и области, по которой он будет двигаться)
let itemProp = function(item) {
    return {
        width: parseInt(window.getComputedStyle(item).getPropertyValue("width")),
        height: parseInt(window.getComputedStyle(item).getPropertyValue("height")),
    }
};

let wrapProp = itemProp(wrap); // размеры области
let boxProp = itemProp(box); // размеры кубика

function animate() {
    let pos = 0;

    let id = setInterval(frame, 10);

    function frame() {
        // Если позиция будет равна границе области - прерываем анимацию
        if ((wrapProp.width - boxProp.width) - 1 === pos || (wrapProp.height - boxProp.height) - 1 === pos) {
            pos--;
            box.style.top = pos + 'px';
            box.style.left = pos + 'px'
            clearInterval(id);
        } else {
            pos++;
            box.style.top = pos + 'px';
            box.style.left = pos + 'px'
        }
    }
}

