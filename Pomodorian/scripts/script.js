const btn = document.getElementById("btn");
const CountDown = document.getElementById("countDown");
const hString= document.getElementById("warn");
const settings = document.getElementById("settings");
const settings_btn = document.getElementsByClassName("setting_btn");

const cyles_i= document.getElementsByClassName("A-cycles");

const v_work=25;
const startingMinutes = v_work;
const v_rest=5;

let alarmSet = false;
let updateCountDown;
let mode = "Work";
let time = startingMinutes * 60;
let clickTimes = 0;

let cycles = 0;
let PrefferedCycles = 3;

window.onload=function(){
    PrefferedCycles = localStorage.getItem("Pcycles");
    cyles_i.placeholder= PrefferedCycles;
    
btn.addEventListener("click", () => {
    clickTimes++;
    if(clickTimes == 1){
        updateCountDown = setInterval(updateCountdown, 1000);    
        hString.innerText = mode +' '+ "Time";
    }
});

cyles_i[0].addEventListener("input", function(){
  var value = cyles_i[0].value;
  console.log("hi");
  value = parseInt(value);

  PrefferedCycles = value;
  localStorage.setItem("Pcycles", value);
}, false);

}

function startNewCycle(Mode)
{
    if(mode == "Rest"){
        time = v_rest * 60;
        updateCountDown = setInterval(updateCountdown, 1000);
        hString.innerText = mode +' '+ "Time";
    }
    else if(mode == "Work"){
        time = v_work * 60;
        updateCountDown = setInterval(updateCountdown, 1000);
        hString.innerText = mode +' '+ "Time";
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
            startNewCycle("Rest");
        }
        else if(mode == "Rest" && PrefferedCycles != cycles)
        {
            mode = "Work";
            startNewCycle("Work");
            cycles++;
        }
    }
}

function setAlarm(){
    
    let sound = new Audio("audio/alarm.wav");
    sound.play();
    alarmSet = true;
}

