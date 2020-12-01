let box = document.getElementById('box'), // по ID
    btn = document.getElementsByTagName('button'), // по тэгу
    circle = document.getElementsByClassName('circle'), // по классу
    hearts = document.querySelectorAll('.heart'), // выбирает все элементы по классу
    heart = document.querySelector('.heart'), // выбирает первый элемент по классу
    wrap = document.querySelector('.wrap');

let div = document.createElement('div'), // создаем элемент
    text = document.createTextNode('Some text'); // добавляем текстовый узел

div.innerHTML = "<h1>Some text</h1>"; // Добавляем текст с разметкой
div.textContent = "<h1>Title</h1>"; // Добавляет только текст, разметка вставляется текстом

div.classList.add('black');
document.body.appendChild(div); //вставляет элемент в конец документа
wrap.appendChild(div); // вставляет в конец родителя
document.body.insertBefore(div, circle[0]); // вставляет эл div перед первым блоком .circle

document.body.removeChild(heart); // Удаляет элемент

document.body.replaceChild(btn[1], circle[1]) // Заменяет circle[1] на btn[1]. Проще: перемещает бтн на место circle

