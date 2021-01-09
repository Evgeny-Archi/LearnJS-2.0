const newmap = new Map([
    [1, 2],
    [4, 5]
  ])
  newmap.set('one', 1)
  console.log(newmap);

// Получение уникальных значений из массива
function unique(arr) {
    let set = new Set(arr)
    let str = Array.from(set)
    return str.join(', ')
}
let values = ['Hare', 'Khristina', 'Hare', 'Khristina', 'Hare', 'Hare', 'Khristina', 'Hi']
console.log(unique(values)); // Hare, Khristina, Hi

// Фильтр анаграмм
function aclean(arr) {
    let map = new Map()
    for (let word of arr) {
        let sorted = word.toLowerCase().split('').sort().join('');
        map.set(sorted, word) // перезаписывает свойство, если оно такое же
    }
    return Array.from(map.values())
}
let arr = ['nap', 'teachers', 'cheaters', 'PAN', 'ear', 'era', 'hectares']
console.log(aclean(arr)); // [ "PAN", "hectares", "era" ]

let map = new Map([
    [1, 2],
    [4, 5]
])
console.log(Array.from(map.keys())); // [1, 4]
console.log(Array.from(map.values())); // [2, 5]
