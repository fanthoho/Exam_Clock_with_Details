document.addEventListener('DOMContentLoaded', function() {
    const subjectSelect = document.getElementById('subject-select');
    const minutesInput = document.getElementById('minutes-input');
    const startButton = document.getElementById('start-button');
    const selectedSubjectDisplay = document.getElementById('selected-subject');
    const minutesDisplay = document.getElementById('minutes-display');
    const countdownTimerDisplay = document.getElementById('countdown-timer');
    const alarmSound = document.getElementById('alarm-sound');

    let countdownInterval;
    let timeLeft;

    startButton.addEventListener('click', function() {
        const selectedSubject = subjectSelect.value;
        const minutes = parseInt(minutesInput.value, 10);

        if (isNaN(minutes) || minutes <= 0) {
            alert('Please enter the number of minutes. Must be positive number.。');
            return;
        }

        const now = new Date();
        const startTime = new Date(now.getTime());
        const endTime = new Date(now.getTime() + minutes * 60000);
        const hStr1 = startTime.getHours();
        const mStr1 = startTime.getMinutes();
        const tempStr1 = ":";
        if (mStr1 <10) {
            tempStr1 = ":0";
        }
        const hStr2 = endTime.getHours();
        const mStr2 = endTime.getMinutes();
        const tempStr2 = ":";
        if (mStr2 <10) {
            tempStr2 = ":0";
        }
        const startTimeString  = `${hStr1} ${tempStr1} ${mStr1}';
        const endTimeString  = `${hStr2} ${tempStr2} ${mStr2}';
                
        selectedSubjectDisplay.textContent = subjectSelect.options[subjectSelect.selectedIndex].text;
        minutesDisplay.textContent = `${startTimeString} - ${endTimeString} (total ${minutes} minutes)`;
        timeLeft = minutes * 60;

        clearInterval(countdownInterval);
        updateCountdownDisplay();
        countdownInterval = setInterval(updateCountdown, 1000);
    });

    function updateCountdown() {
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            countdownTimerDisplay.textContent = 'Time is up. Stop Writing.';
            alarmSound.play();
            return;
        }

        timeLeft--;
        updateCountdownDisplay();
    }

    function updateCountdownDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        countdownTimerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
});
