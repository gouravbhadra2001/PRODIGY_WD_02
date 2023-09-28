

let [startTime, elapsedTime, lapNo] = [0, 0, 0],
  [running, paused, on] = [false, false, false],
  interval;

const display = document.getElementById('display'),
  startStopButton = document.getElementById('startStop'),
  playPauseButton = document.getElementById('playPause'),
  resetButton = document.getElementById('reset'),
  lapButton = document.getElementById('lap');
const laplist = document.querySelector('.collapsible-content');


const power =document.getElementById("power");
const disabler = document.querySelector('.disabler');
const collapsible = document.querySelector('.content-inner');
const laplistbtn = document.querySelector('.lbl-toggle');

playPauseButton.style.display = 'none';
lapButton.style.display = 'none';

function formatTime(milliseconds) {
  const hours = Math.floor(milliseconds / 3600000),
    minutes = Math.floor((milliseconds % 3600000) / 60000),
    seconds = Math.floor((milliseconds % 60000) / 1000),
    millisecondsPart = milliseconds % 1000;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${millisecondsPart.toString().padStart(3, '0')}`;
}

function updateDisplay() {
  display.textContent = formatTime(elapsedTime);
}

function toggleStartStop() {
  if (running) {
    clearInterval(interval);
    running = false;
    startStopButton.innerHTML = 'Play';
    playPauseButton.style.display = 'none';

    lapButton.style.display = 'none';

  } else {
    startTime = Date.now() - elapsedTime;
    playPauseButton.textContent = "Pause";

    interval = setInterval(updateTime, 10); 
    running = true;

    startStopButton.textContent = 'Stop';
    playPauseButton.style.display = 'inline';
    resetButton.style.display = 'inline';
    lapButton.style.display = 'inline';

  }
}

function togglePlayPause() {
  if (running && !paused) {
    clearInterval(interval);
    paused = true;
    playPauseButton.textContent = 'Resume';
  } else if (running && paused) {
    interval = setInterval(updateTime, 10);
    paused = false;
    playPauseButton.textContent = 'Pause';
  }
}

function reset() {
  clearInterval(interval);
  elapsedTime = 0;
  paused = false;
  running = false;
  startStopButton.textContent = 'Start';
  playPauseButton.textContent = 'Play';
  updateDisplay();


}

function lap() {
  const lapTime = formatTime(elapsedTime);
  const lapDisplay = document.createElement('p');
  lapDisplay.textContent = `${++lapNo}: ${lapTime}`;
  collapsible.appendChild(lapDisplay);
}

function updateTime() {
  elapsedTime = Date.now() - startTime;
  updateDisplay();
}





let myLabels = document.querySelectorAll('.lbl-toggle');
 Array.from(myLabels).forEach(label => 
  { label.addEventListener('keydown', e => 
  { if (e.which === 32 || e.which === 13) { 
    e.preventDefault(); label.click(); 
  }; 
}); 
}); 


function onOff(){
  if (disabler.style.visibility==='hidden'){
    disabler.style.visibility='visible';
    laplistbtn.style.visibility='hidden';
    laplist.style.visibility='hidden';
    power.style.backgroundColor="white";
    display.innerHTML = '';
    

    location.reload();

  }
  else{
    disabler.style.visibility='hidden';
    laplistbtn.style.visibility='visible';
    laplist.style.visibility='visible';
    power.style.backgroundColor="rgb(144, 235, 245)";
    display.innerHTML = '00:00:00:000';
  }
}

startStopButton.addEventListener('click', toggleStartStop);
playPauseButton.addEventListener('click', togglePlayPause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);
power.addEventListener('click', onOff);
