// Массивы
let arr = ['one', 'two', 'three', 'four', 'five'];

arr.pop(); // Удаляет элемент в конце массива
arr.push(6); // Добавляет элемент в конец массива
arr.shift(); // Удаляет эл в начале массива (первый элемент)
arr.unshift(1); // Добавляет в начало массива
arr[99] = '99'; // Присваивает 99 индексу число 99. Массив = 1, 2, 3... <empty 94> ...99
arr.indexOf('two'); // 1 Поиск номера элемента в массиве

arr.forEach(function(item, i, mass) {
    //console.log(`Index ${i}, element ${item} in array ${mass}`);
})
for(let key in arr) {
    //... key - ключи массива (0, 1, 2, 3..)
}
for(let key of arr) {
    //... key - элементы массива (one, two, three, ...)
}

let data = 'one, two, three, four',
    mass = [];
mass = data.split(',') // метод split разбивает строку по разделителю (,) и добавляет в массив

let i = arr.join(', '); // Преобразует массив в строку с разделителем (не обязательным)

arr.sort(); // Сортирует по алфавиту (по умолчанию)

// Сортируем числа с колбэк функцией для корректного вывода
arr = [10, 2, 4, 1, 9, 5];
arr.sort(compareNum);
function compareNum(a, b) {
    return a - b;
}


