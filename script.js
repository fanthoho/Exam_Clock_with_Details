document.addEventListener('DOMContentLoaded', function() {
    const subjectSelect = document.getElementById('subject-select');
    const minutesInput = document.getElementById('minutes-input');
    const startButton = document.getElementById('start-button');
    const selectedSubjectDisplay = document.getElementById('selected-subject');
    const totalpageDisplay = document.getElementById('totalpage-display');
    const minutesDisplay = document.getElementById('minutes-display');
    const totalminutesDisplay = document.getElementById('totalminutes-display');
    const countdownTimerDisplay = document.getElementById('countdown-timer');
    const alarmSound = document.getElementById('alarm-sound');
    const pauseButton = document.getElementById('pause-button'); // Get pause button

    let countdownInterval;
    let timeLeft;
    let isPaused = false; // Track pause state
    let remainingTimeBeforePause; // Store remaining time before pause

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

        const hstr1 = startTime.getHours();
        const hstr2 = endTime.getHours();
        const mstr1 = startTime.getMinutes();
        const mstr2 = endTime.getMinutes();
        let tempstr1 = ":";
        let tempstr2 = ":";
        if (mstr1 < 10) {
            tempstr1 = ":0";
        }
        if (mstr2 < 10) {
            tempstr2 = ":0";
        }
        
        selectedSubjectDisplay.textContent = subjectSelect.options[subjectSelect.selectedIndex].text;
        totalpageDisplay.textContent = `total __ pages`;
        minutesDisplay.textContent = `${hstr1}${tempstr1}${mstr1}-${hstr2}${tempstr2}${mstr2}`;
        totalminutesDisplay.textContent = `(total ${minutes} mins)`;
        timeLeft = minutes * 60;
        remainingTimeBeforePause = timeLeft; // Initialize remaining time

        clearInterval(countdownInterval);
        isPaused = false;
        pauseButton.textContent = 'Pause'; // Set pause button text
        updateCountdownDisplay();
        countdownInterval = setInterval(updateCountdown, 1000);
    });

    pauseButton.addEventListener('click', function() {
        if (isPaused) {
            // Resume countdown
            isPaused = false;
            pauseButton.textContent = 'Pause';
            timeLeft = remainingTimeBeforePause;
            countdownInterval = setInterval(updateCountdown, 1000);
        } else {
            // Pause countdown
            isPaused = true;
            pauseButton.textContent = 'Resume';
            clearInterval(countdownInterval);
            remainingTimeBeforePause = timeLeft;
        }
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
