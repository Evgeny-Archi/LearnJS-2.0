window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    let box = document.querySelector('.box'),
        btn = document.querySelector('button');

    // Ширина и высота без учета бордеров, полосы прокрутки и паддингов
    let clientBoxWidth = box.clientWidth,
        clientBoxHeight = box.clientHeight;

    // Ширина и высота с учебом паддингов, бордера и полосы прокрутки. Совпадает со значениями css
    let offsetBoxWidth = box.offsetWidth,
        offsetBoxHeight = box.offsetHeight;

    // Скрытая часть сверху за скроллом
    // scrollTop и scrollLeft можно изменять. Остальные - нет.
    let scrollBoxTop = box.scrollTop;

    //Ширина с учетом паддингов, но без полосы прокрутки. Высота всего текста за пределами скрола.
    let scrollBoxWidth = box.scrollWidth,
        scrollBoxHeight = box.scrollHeight;

    btn.addEventListener('click', function() {
        box.style.height = (scrollBoxHeight + 20) + 'px';
    })

    // Получение координат элемента: left, right = left + ширина элемента, top and bottom = top + высота элемента.
    console.log(box.getBoundingClientRect())

    // Получение ширины документа. client = offset
    console.log(document.documentElement.clientWidth);
    console.log(document.documentElement.offsetWidth);
    // Прокрутка страницы вверх
    document.documentElement.scrollTop = 0;

    // Прокручивает на высоту 200 с верха документа
    scrollTo(0, 200)


    // Размеры из css, совпадают с данными из css. Имеют ед измерения "px"
    let widthCss = window.getComputedStyle(box);
})