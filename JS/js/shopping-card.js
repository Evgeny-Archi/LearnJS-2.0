const totalPrice = document.getElementById('js-total-price');

const getItemSubTotalPrice = (input) => Number(input.value) * Number(input.dataset.price);
const formatNumber = (num) => num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ' ');

const setTotalPrice = (value) => {
    totalPrice.textContent = formatNumber(value);
    totalPrice.dataset.value = value;
}

const init = () => {
    // Метод forEach()
    // let totalCoast = 0;
    // [...document.querySelectorAll('.js-row-item')].forEach((item) => {
    //     totalCoast += getItemSubTotalPrice(item.querySelector('.amount-input'));
    // })

    // Метод reduce() без использования getItemSubTotalPrice()
    let initialValue = 0;
    const totalCoast = [...document.querySelectorAll('.amount-input')].reduce((accumulator, currentValue) => {
        return accumulator + currentValue.dataset.price * currentValue.value;
    }, initialValue)

    setTotalPrice(totalCoast);
}

const calculateItem = (item, action) => {
    const input = item.querySelector('.amount-input');

    switch (action) {
        case 'plus':
            input.value++;
            setTotalPrice(Number(totalPrice.dataset.value) + Number(input.dataset.price));
            break;
        case 'minus':
            input.value--;
            setTotalPrice(Number(totalPrice.dataset.value) - Number(input.dataset.price));
            break;
    }

    item.querySelector('.js-subtotal').textContent = `${formatNumber(getItemSubTotalPrice(input))} руб.`;
}

document.querySelector('.js-cards').addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-minus') || event.target.closest('.btn-minus')) {
        const input = event.target.closest('.js-row-item').querySelector('.amount-input');
        if (Number(input.value) !== 0) {
            calculateItem(event.target.closest('.js-row-item'), 'minus');
        }
    }
    if (event.target.classList.contains('btn-plus') || event.target.closest('.btn-plus')) {
        calculateItem(event.target.closest('.js-row-item'), 'plus');
    }

})

init();
