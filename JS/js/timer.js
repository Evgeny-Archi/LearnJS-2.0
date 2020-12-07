window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    let deadline = '2020-12-08';

    function getTimeRemaining(endtime) {
        let t = Date.parse(deadline) - Date.parse(new Date()),
            s = Math.floor((t/1000) % 60),
            m = Math.floor((t/1000/60) % 60),
            h = Math.floor((t/(1000 * 60 * 60)));

        return {
            'total': t,
            'hours': h,
            'minutes': m,
            'seconds': s
        };
    }

    function setTimer(id, endtime) {
        let timerBox = document.querySelector(id),
        hourBox = timerBox.querySelector('.hours'),
        minuteBox = timerBox.querySelector('.minutes'),
        secondBox = timerBox.querySelector('.seconds'),
        timeInterval = setInterval(updateTimer, 1000);

        function updateTimer() {
            let t = getTimeRemaining(endtime);
            hourBox.textContent = t.hours.toString().length < 2 ? '0' + t.hours : t.hours;
            minuteBox.textContent = t.minutes.toString().length < 2 ? '0' + t.minutes : t.minutes;
            secondBox.textContent = t.seconds.toString().length < 2 ? '0' + t.seconds : t.seconds;

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setTimer('.timer', deadline);
})
