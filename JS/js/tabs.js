window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    const tabs = document.querySelector('.tabs'),
        tabsItem = document.querySelectorAll('.tabs__item'),
        tabContent = document.querySelectorAll('.tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1)

    function showTabContent(b) {
        if(tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    function toggleTabActive(target) {
        for (let i = 0; i < tabsItem.length; i++) {
            tabsItem[i].classList.remove('active');
        }
        target.classList.add('active');
    }

    tabs.addEventListener('click', function(event) {
        let target = event.target;
        if (target && target.classList.contains('tabs__item')) {
            for (let i = 0; i < tabsItem.length; i++) {
                if (target === tabsItem[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    toggleTabActive(target);
                    break;
                }
            }
        }
    })
});