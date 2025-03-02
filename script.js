document.addEventListener('DOMContentLoaded', function() {
    const subjectSelect = document.getElementById('subject-select');
    const minutesInput = document.getElementById('minutes-input');
    const startButton = document.getElementById('start-button');
    const countdownTimer = document.getElementById('countdown-timer');
    const subjectDisplay = document.getElementById('subject-display');
    const timeDisplay = document.getElementById('time-display');

    let timerInterval;
    let endTime;

    startButton.addEventListener('click', function() {
        const selectedSubject = subjectSelect.value;
        const minutes = parseInt(minutesInput.value, 10);

        if (isNaN(minutes) || minutes <= 0) {
            alert('請輸入有效的分鐘數。');
            return;
        }

        // 清除之前的計時器
        clearInterval(timerInterval);

        // 計算結束時間
        const now = new Date();
        const startTime = new Date(now.getTime()); // 記錄開始時間
        endTime = new Date(now.getTime() + minutes * 60000);

        // 顯示開始和結束時間
        const startTimeString = formatTime(startTime);
        const endTimeString = formatTime(endTime);
        timeDisplay.textContent = `${startTimeString} - ${endTimeString} (Total ${minutes} min)`;

        // 更新科目顯示
        subjectDisplay.textContent = `科目: ${selectedSubject}`;

        // 開始倒數
        startTimer(endTime);
    });

    function startTimer(endTime) {
        timerInterval = setInterval(function() {
            const now = new Date();
            const timeLeft = endTime.getTime() - now.getTime();

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                countdownTimer.textContent = '時間到！';
                return;
            }

            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            countdownTimer.textContent = `${minutes} 分 ${seconds} 秒`;
        }, 1000);
    }

    function formatTime(date) {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }
});
