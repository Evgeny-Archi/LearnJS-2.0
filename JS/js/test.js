const btn = document.querySelector('button'),
      out = document.querySelector('.count'),
      text = document.querySelector('#text');
let textCount = document.querySelector('.text-count');

// Считалка
btn.addEventListener('click', () => {
    let count = 0;
    setInterval(() => {
        count++;
        out.textContent = count;
    }, 1000)
});

// Считалка текста
text.addEventListener('input', () => {
    textCount.textContent = text.value.length;
})

// Считалка input
let initialValue = 0;
const total = [...document.querySelectorAll('.js-input')].reduce((accumulator, currentValue) => {
    return accumulator + currentValue.dataset.price * currentValue.value;
}, initialValue);

console.log(total)


