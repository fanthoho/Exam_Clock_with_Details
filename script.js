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
    const stopAlarmButton = document.getElementById('stop-alarm-button');
    const pauseButton = document.getElementById('pause-button');
    const subjectButton = document.getElementById('subject-button');
    const pauseDisplay = document.getElementById('pause-display'); // Get pause display element

    let countdownInterval;
    let timeLeft;
    let isPaused = false;
    let remainingTimeBeforePause;
    let startTime;
    let totalMinutes;
    let totalPauseTime = 0; // Track total pause time in seconds
    let pauseStartTime; // Track when pause started
    let timerStarted = false; // Add a flag to track if the timer has started

    subjectButton.addEventListener('click', function() {
        const selectedSubject = subjectSelect.value;
        const minutes = parseInt(minutesInput.value, 10);

        if (isNaN(minutes) || minutes <= 0) {
            alert('Please enter the number of minutes. Must be positive number.');
            return;
        }

        selectedSubjectDisplay.textContent = subjectSelect.options[subjectSelect.selectedIndex].text;
        totalpageDisplay.textContent = 'Total ____ pages';
    }
    
    startButton.addEventListener('click', function() {
        const selectedSubject = subjectSelect.value;
        const minutes = parseInt(minutesInput.value, 10);

        if (isNaN(minutes) || minutes <= 0) {
            alert('Please enter the number of minutes. Must be positive number.');
            return;
        }
        
        const now = new Date();
        startTime = new Date(now.getTime());
        totalMinutes = minutes;
        timeLeft = minutes * 60;
        remainingTimeBeforePause = timeLeft;
        totalPauseTime = 0; // Reset pause time when starting a new timer

        updateTimeDisplay(); // Update the time display
        updatePauseDisplay(); // Update the pause display

        clearInterval(countdownInterval);
        isPaused = false;
        pauseButton.textContent = 'Pause';
        updateCountdownDisplay();
        countdownInterval = setInterval(updateCountdown, 1000);

        startButton.textContent = 'Restart';

    });

    pauseButton.addEventListener('click', function() {
        if (isPaused) {
            // Resume countdown
            isPaused = false;
            pauseButton.textContent = 'Pause';
            timeLeft = remainingTimeBeforePause;
            totalPauseTime += (new Date().getTime() - pauseStartTime) / 1000; // Accumulate pause time
            timerStarted = true;
            updateTimeDisplay(); // Update the time display
            updatePauseDisplay(); // Update the pause display
            countdownInterval = setInterval(updateCountdown, 1000);
        } else {
            // Pause countdown
            isPaused = true;
            pauseButton.textContent = 'Resume';
            clearInterval(countdownInterval);
            remainingTimeBeforePause = timeLeft;
            pauseStartTime = new Date().getTime(); // Record pause start time
        }
    });

    function updateCountdown() {
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            countdownTimerDisplay.textContent = 'Time is up. Stop Writing.';
            alarmSound.play();
            stopAlarmButton.style.display = 'inline-block'; // Show stop alarm button
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

    function updateTimeDisplay() {
        const hstr1 = startTime.getHours();
        const mstr1 = startTime.getMinutes();
        let tempstr1 = ":";
        if (mstr1 < 10) {
            tempstr1 = ":0";
        }

        const adjustedTotalMinutes = totalMinutes + Math.floor(totalPauseTime / 60); // Add pause time to total minutes
        const endTime = new Date(startTime.getTime() + adjustedTotalMinutes * 60000);
        const hstr2 = endTime.getHours();
        const mstr2 = endTime.getMinutes();
        let tempstr2 = ":";
        if (mstr2 < 10) {
            tempstr2 = ":0";
        }

        minutesDisplay.textContent = `${hstr1}${tempstr1}${mstr1}-${hstr2}${tempstr2}${mstr2}`;
    }

    function updatePauseDisplay() {
        if (timerStarted) { // Only update if the timer has started
            const pauseMinutes = Math.floor(totalPauseTime / 60);
            const pauseSeconds = Math.floor(totalPauseTime % 60);
            pauseDisplay.textContent = `(Pause ${pauseMinutes} min ${pauseSeconds} sec)`; // Update pauseDisplay with seconds
        } else {
            pauseDisplay.textContent = ""; // Clear the text if the timer hasn't started
        }
        totalminutesDisplay.textContent = `(Total ${totalMinutes} min)`; // Update totalminutesDisplay
    }
    
    // Stop alarm button click handler
    stopAlarmButton.addEventListener('click', function() {
        alarmSound.pause();
        alarmSound.currentTime = 0; // Reset audio to start
        stopAlarmButton.style.display = 'none'; // Hide stop alarm button
    });

    // Initialize the pause display to be empty on page load
    pauseDisplay.textContent = "";
});
