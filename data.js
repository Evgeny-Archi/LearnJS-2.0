// Экспорт в другой файл
// const text = 'Some text';
// module.exports = text;

// Подключение модулей
// const path = require('path');
// const fs = require('fs');
// const os = require('os');
// const EventEmitter = require('events');

// const emitter = new EventEmitter();
// emitter.on('anything', data => {
//     console.log(data);
// });

// emitter.emit('anything', {a: 1});

// console.log(path.join(__dirname, 'test'));

// fs.mkdir(path.join(__dirname, 'test'), (err) => {
//     if (err) {
//         console.log('File already exists');
//         throw err
//     } 
//     console.log('Create folder');
//  
// });

// const filePath = path.join(__dirname, 'test', 'test.txt');
// fs.writeFile(filePath, 'Hello', err => {
//     if (err) {
//         throw err
//     }
//     console.log('File was create');
// })

// fs.appendFile(filePath, '\nhello again', err => {
//     if (err) {
//         throw err
//     }
//     console.log('File was create');
// })

// fs.readFile(filePath, 'utf-8', (err, content) => {
//     if (err) {
//         throw err
//     }
//     console.log(content);
// })

// console.log('OS: ', os.platform());
// console.log('Home dir: ', os.homedir());
