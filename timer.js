var second = 1000;
var pause = false;
var running = false;
var curTime;
var timeLimitMins;
var timeLimitBreak;
var timeLimitSecs = 59;
var timeMins;
var timeSecs = timeLimitSecs;
var timeMinsBreak;
var timeString;
var timeStringBreak;

function startTimer(){
  if (!running){
    timeLimitMins = parseInt($("#displayPomodoro").text());
    timeMins = timeLimitMins-1;
    timeLimitBreak = parseInt($("#displayBreak").text());
    timeMinsBreak = timeLimitBreak;
    running = true;
    curTime = setInterval(displayTimer, second);
  }
}

function displayTimer(){
  timeString = toDigits(timeMins, timeSecs);
  timeStringBreak = toDigits(timeMinsBreak, timeSecs);
  if(!pause){
    document.getElementById("timerDisplay").innerHTML = timeString;
    document.getElementById("status").innerHTML = "Work!";
    decTime();
  } else {
    document.getElementById("timerDisplay").innerHTML = timeStringBreak;
    document.getElementById("status").innerHTML = "Take a break!";
    decTimeBreak();
  }
}

function decTime(){
  timeSecs--;
  if (timeMins===0&&timeSecs===-1){
    clearInterval(curTime);
    timeSecs = timeLimitSecs;
    timeMinsBreak = timeLimitBreak-1;
    pause = true;
    curTime = setInterval(displayTimer, second);
  } else if (timeSecs===-1){
    timeSecs=timeLimitSecs;
    timeMins--;
  }
  timeString = toDigits(timeMins, timeSecs);
}

function decTimeBreak(){
  timeSecs--;
  if (timeMinsBreak===0&&timeSecs===-1){
    clearInterval(curTime);
    timeSecs = timeLimitSecs;
    timeMins = timeLimitMins-1;
    pause = false;
    curTime = setInterval(displayTimer, second);
  }
  if (timeSecs===-1){
    timeSecs = timeLimitSecs;
    timeMinsBreak--;
  }
  timeStringBreak = toDigits(timeMinsBreak, timeSecs);
}

function pauseTimer(){
   clearInterval(curTime);
   document.getElementById("status").innerHTML = "Paused";
   running = false;
}

function stopTimer(){
   clearInterval(curTime);
   running = false;
   timeSecs = timeLimitSecs;
   timeMins = timeLimitMins-1;
   document.getElementById("status").innerHTML = "----------";
   document.getElementById("timerDisplay").innerHTML = "--:--";
}

function addPomodoro(){
  timeLimitMins++;
  document.getElementById("displayPomodoro").innerHTML = timeLimitMins;
}

function decPomodoro(){
  if(timeLimitMins!==0){
    timeLimitMins--;
    document.getElementById("displayPomodoro").innerHTML = timeLimitMins;
  }
}

function addBreak(){
  timeLimitBreak++;
  document.getElementById("displayBreak").innerHTML = timeLimitBreak;
}

function decBreak(){
  if(timeLimitBreak!==0){
    timeLimitBreak--;
    document.getElementById("displayBreak").innerHTML = timeLimitBreak;
  }
}

function toDigits(mins, secs){
  if(mins<10){
    sMins = "0"+mins.toString();
  } else {
    sMins = mins.toString();
  }
  if(secs<10){
    sSecs = "0"+secs.toString();
  } else {
    sSecs = secs.toString();
  }
  return sMins+":"+sSecs;
}
