const btn = document.getElementById("btn");
const CountDown = document.getElementById("countDown");
const hString= document.getElementById("warn");

const v_work = 0.35;
const startingMinutes = v_work;
const v_rest = 0.25;

let alarmSet = false;
let updateCountDown;
let mode = "Work";
let time = startingMinutes * 60;

let cycles = 0;
let PrefferedCycles = 3;

window.onload=function(){
btn.addEventListener("click", () => {
    updateCountDown = setInterval(updateCountdown, 1000);    
    // startNewCycle(mode);
});
}

function startNewCycle(Mode)
{
    if(mode == "Rest"){
        time = v_rest * 60;
        updateCountDown = setInterval(updateCountdown, 1000);
    }
    else if(mode == "Work"){
        time = v_work * 60;
        updateCountDown = setInterval(updateCountdown, 1000);
    }
}
function updateCountdown()
{
    const Minutes = Math.floor(time/60);
    let Seconds = time % 60;

    Seconds = Seconds < 10 ? '0' + Seconds: Seconds;
    CountDown.innerHTML = Minutes + ':' + Seconds;
    if(time > 0){
        time--;
    }       
    if(time == 0){

        setAlarm();
        clearInterval(updateCountDown);
        if(mode == "Work" && PrefferedCycles != cycles)
        {
            mode = "Rest";
            startNewCycle("Rest")
        }
        else if(mode == "Rest" && PrefferedCycles != cycles)
        {
            mode = "Work";
            startNewCycle("Work");
            cycles++;
        }
        console.log(mode);
        console.log(cycles);
    }
}

function setAlarm(){
    
    let sound = new Audio("audio/alarm.wav");
    sound.play();
    alarmSet = true;
}
function changeMode(Mode = "Work"){
        hString.innerHTML = Mode +' '+ "Time";
   if(Mode = ""){hString.innerHTML = "press to start count down";}
}

