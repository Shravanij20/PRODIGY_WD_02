let startTime;
let elapsedTime = 0;
let timerInterval;
let laps = [];

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);

    let formattedHH = hh.toString().padStart(2, '0');
    let formattedMM = mm.toString().padStart(2, '0');
    let formattedSS = ss.toString().padStart(2, '0');
    let formattedMS = ms.toString().padStart(2, '0');

    return `${formattedHH}:${formattedMM}:${formattedSS}`;
}

function print(txt) {
    display.textContent = txt;
}

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function() {
        elapsedTime = Date.now() - startTime;
        print(timeToString(elapsedTime));
    }, 10);
    showButton('stop');
}

function stop() {
    clearInterval(timerInterval);
    showButton('start');
}

function reset() {
    clearInterval(timerInterval);
    print("00:00:00");
    elapsedTime = 0;
    laps = [];
    lapsContainer.innerHTML = '';
    showButton('start');
}

function lap() {
    const lapTime = timeToString(elapsedTime);
    laps.push(lapTime);
    const lapElement = document.createElement('div');
    lapElement.className = 'lap';
    lapElement.textContent = `Lap ${laps.length}: ${lapTime}`;
    lapsContainer.appendChild(lapElement);
}

function showButton(buttonKey) {
    const show = buttonKey === 'start' ? startButton : stopButton;
    const hide = buttonKey === 'start' ? stopButton : startButton;
    show.style.display = 'inline-block';
    hide.style.display = 'none';
}

startButton.addEventListener('click', start);
stopButton.addEventListener('click', stop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);

showButton('start'); // Initialize the start button to be visible
