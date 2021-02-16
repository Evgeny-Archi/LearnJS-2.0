/*
    Практика со строками
*/

// Возвращает строку с заглавной первой буквой
function ucFirst(str) {
    if (!str) return str;
    return str[0].toUpperCase() + str.slice(1);
}
// Проверка на вхождение viagra и xxx в строке
function checkSpam(str) {
    if (str.toLowerCase().includes('viagra') || str.toLowerCase().includes('xxx')) {
        return true;
    }
    return false
}
console.log(checkSpam('buy ViAgRA now'))
console.log(checkSpam('free xxxxx'))
console.log(checkSpam("innocent rabbit"))
// Возврат строки, обрезанной по макс длину maxlength
function truncate(str, maxlength) {
    if (str.length <= maxlength) return str;
    return str.substr(0, maxlength - 3) + '...';
}
console.log(truncate('Вот, что мне хотелось бы сказать на эту тему:', 20))
console.log(truncate('Hello everyone', 20))
// Возвращает число без валюты
function extractValue(str) {
    return +str.slice(1);
}
console.log(extractValue('$120'));
