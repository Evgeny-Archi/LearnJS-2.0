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

// Получение чисел от пользователя пока не будет введена строка или отмена. Их добавление в массив и суммирование.
function sumInput() {
    let arr = [];
    while(true) {
        let input = prompt('Input some number', '');
        if (input == '' || input == null || !isFinite(input)) break;
        arr.push(+input);
    }
    let sum = 0;
    for(let i of arr) {
        sum += i;
    }
    return sum;
}
console.log(sumInput());

// Массив наоборот.
let arr = ['a', 'b', 'c', 'd', 'e', 'f'];
let inverse = [];
// Вариант 1. Добавление в конец нового массива.
for (let i = arr.length - 1; i >= 0; i--) {
    inverse.push(arr[i])
}
// Вариант 2. Добавление в начало нового массива
arr.forEach(function(item, index) {
    inverse.unshift(arr[index]);
})
// Вариант 3. Тоже что и второй вариант
for(let key of arr) {
    inverse.unshift(key);
}
// Вариант 4. Без использования методов массива.
let j = 0;
for (let i = arr.length - 1; i >= 0; i--) {
    inverse[j] = arr[i];
    j++;
}
// Вариант 5. Метод reverse()
arr.reverse();

/* Алгоритмы */
// Сортировка пузырьком с проверкой был ли отсортирован ранее.
let arr = [6, 1, -4, 10, 3, -5];
const bubbleSort = (arr) => {
    for (let i = 0; i < arr.length - 1; i++) {
        let wasSwap = false;
        for (let j = 0; j < arr.length - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // аналогично arr[j] = arr[j + 1]; arr[j + 1] = swap, где swap = arr[j]
                wasSwap = true
            }
        }
        if (!wasSwap) break;
    }
    console.log(arr);
}
bubbleSort(arr);

// Шейкерная сортировка
let arr = [6, 1, -4, 10, 3, -5];
const swap = (arr, i, j) => {
    let swap = arr[i];
    arr[i] = arr[j];
    arr[j] = swap;
}

const shakerSort = (arr) => {
    let left = 0,
        right = arr.length - 1;

    while(left < right) {
        for (let i = left; i < right; i++) {
            if (arr[i] > arr[i + 1]) {
                swap(arr, i, i + 1);
            }
        }
        right--;

        for (let i = right; i > left; i--) {
            if (arr[i] < arr[i - 1]) {
                swap(arr, i, i - 1);
            }
        }

        left++;
    }

    console.log(arr);
}
shakerSort(arr);

// Разделение массива пополам и возвращение его в обратном порядке. Попытка создания алгоритма сортировки слиянием
let arr = [1,2,3,4,5, 6];
function merge(arrLeft, arrRight) {
    arr = arrRight.concat(arrLeft);
    // arr = [...arrRight, ...arrLeft]; // Аналогично выше.
    console.log(arr);
}
function sort(arr) {
    if (!arr || !arr.length) {
        return null;
    }
    if(arr.length <= 1) {
        return arr;
    }
    let middle = Math.floor(arr.length / 2);
    let arrLeft = arr.slice(0, middle);
    let arrRight = arr.slice(middle);
    return merge(arrLeft, arrRight);
}
sort(arr)


