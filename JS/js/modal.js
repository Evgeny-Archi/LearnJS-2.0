// Практика: Модальное окно (modal.html)
const CLASS_LIST = {
    MODAL: 'modal',
    MODAL_ACTIVE: 'modal--active',
    MODAL_HAS_SCROLL: 'modal--has-scroll',
    MODAL_DIALOG_BODY: 'modal__dialog-body',
    TRIGGER_OPEN: 'js-modal-open',
    TRIGGER_CLOSE: 'js-modal-close'
};

let resizeObserver = null;

document.addEventListener('click', (event) => {
    /* Не сработает, т.к. внутри ссылки лежит спан
    if (event.target.classList.contains('link')) {
        let modal = document.querySelector('.modal');
        modal.classList.add('modal--active');
    } */

    //open
    if(event.target.closest(`.${CLASS_LIST.TRIGGER_OPEN}`)) {
        event.preventDefault();
        const target = event.target.closest(`.${CLASS_LIST.TRIGGER_OPEN}`);
        const modalId = target.getAttribute('href').replace('#', '');
        const modal = document.getElementById(modalId);

        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${getScrollBarWidth()}px`; // Делаем паддинг справа, чтоб модалка не прыгала вбок на ширину скролла

        modal.classList.add(CLASS_LIST.MODAL_ACTIVE);
        bindResizeObserver(modal); // Добавляем тени при добавлении контента
    }

    // close
    if(event.target.closest(`.${CLASS_LIST.TRIGGER_CLOSE}`) || event.target.classList.contains(CLASS_LIST.MODAL_ACTIVE)) {
        event.preventDefault();

        const modal = event.target.closest(`.${CLASS_LIST.MODAL}`);
        modal.classList.remove(CLASS_LIST.MODAL_ACTIVE);

        unbindResizeObserver(modal);
        modal.addEventListener('transitionend', showScroll);
    }
});

const showScroll = (event) => {
    if (event.propertyName === 'transform') {
        document.body.style.overflow = '';
        document.body.style.paddingRight = ``;

        event.target.closest(`.${CLASS_LIST.MODAL}`).removeListener('transitionend', showScroll);
    }
}

const getScrollBarWidth = () => {
    const item = document.createElement('div');
    item.style.position = 'absolute';
    item.style.top = '-9999px';
    item.style.width = '50px';
    item.style.height = '50px';
    item.style.overflow = 'scroll';
    item.style.visibility = 'hidden';

    document.body.appendChild(item);
    const boxScrollWidth = item.offsetWidth - item.clientWidth;
    document.body.removeChild(item);

    return boxScrollWidth;
}

const bindResizeObserver = (modal) => {
    const content = modal.querySelector(`.${CLASS_LIST.MODAL_DIALOG_BODY}`);

    const toggleShadows = () => {
        modal.classList.toggle(CLASS_LIST.MODAL_HAS_SCROLL, content.scrollHeight > content.clientHeight);
    }

    resizeObserver = new ResizeObserver(toggleShadows);
    resizeObserver.observe(content);
}

const unbindResizeObserver = (modal) => {
    const content = modal.querySelector(`.${CLASS_LIST.MODAL_DIALOG_BODY}`);
    resizeObserver.unobserve(content);
    resizeObserver = null;
}

document.getElementById('js-add-content-temp').addEventListener('click', (event) => {
    const div = document.createElement('div');
    div.textContent = 'Text content';
    div.style.height = '1000px';

    document.body.querySelector(`.${CLASS_LIST.MODAL_DIALOG_BODY}`).appendChild(div);
})