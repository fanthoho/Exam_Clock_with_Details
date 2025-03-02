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
            alert('請輸入有效的分鐘數。');
            return;
        }

        selectedSubjectDisplay.textContent = subjectSelect.options[subjectSelect.selectedIndex].text;
        
        // 顯示開始和結束時間        
        const now = new Date();
        const startTime = new Date(now.getTime()); // 記錄開始時間
        endTime = new Date(now.getTime() + minutes * 60000);
        const startTimeString = formatTime(startTime);
        const endTimeString = formatTime(endTime);
        minutesDisplay.textContent = `${startTimeString} - ${endTimeString} (Total ${minutes} min)`;

        timeLeft = minutes * 60;

        clearInterval(countdownInterval);
        updateCountdownDisplay();
        countdownInterval = setInterval(updateCountdown, 1000);
    });

    function updateCountdown() {
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            countdownTimerDisplay.textContent = '時間到！';
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
