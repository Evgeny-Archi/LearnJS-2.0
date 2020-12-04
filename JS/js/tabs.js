window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    const tabs = document.querySelector('.tabs'),
        tabsItem = document.querySelectorAll('.tabs__item'),
        tabContent = document.querySelectorAll('.tabcontent');

    // Скрываем содержание табов за исключением первого
    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1)

    // Показать содержимое таба b
    function showTabContent(b) {
        if(tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    // Добавляем класс active нажатому табу
    function toggleTabActive(target) {
        for (let i = 0; i < tabsItem.length; i++) {
            tabsItem[i].classList.remove('active');
        }
        target.classList.add('active');
    }

    tabs.addEventListener('click', function(event) {
        let target = event.target;
        if (target && target.classList.contains('tabs__item')) { // Делегирование событий табам
            for (let i = 0; i < tabsItem.length; i++) {
                if (target === tabsItem[i]) { // Если при переборе всех табов есть совпадение на нажатый
                    hideTabContent(0); // Скрываем содержание
                    showTabContent(i); // Показываем тот, чей номер таба совпадает с содержимым
                    toggleTabActive(target); // Подсвечиваем нажатый таб
                    break;
                }
            }
        }
    })
});