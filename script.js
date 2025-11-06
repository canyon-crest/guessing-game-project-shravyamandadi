// global variables
let level, answer, score, playerName;
const levelArr = document.getElementsByName("level");
const scoreArr = [];
const guess = document.getElementById("guess");
const playBtn = document.getElementById("playBtn");
const guessBtn = document.getElementById("guessBtn");
const giveUp = document.getElementById("giveUp");
const msg = document.getElementById("msg");
const wins = document.getElementById("wins");
const avgScore = document.getElementById("avgScore");
let startTime; 
const timeArr = []; 
let fastestTime = 0; 



setInterval(() => {
  document.getElementById("date").textContent = time();
}, 1000);

// add event listeners
playBtn.addEventListener("click",play);
guessBtn.addEventListener("click",makeGuess);
giveUp.addEventListener("click",pressGiveUp);

document.getElementById("setNameBtn").addEventListener("click", () => {
  const input = document.getElementById("myInput").value;
  if (input !== "") {  // no trim
    playerName = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
    document.getElementById("welcome").textContent = "Welcome, " + playerName + "!";
    msg.textContent = playerName + ", select a level and click Play!";
  } else {
    alert("You must enter your name to play!");
  }
});

function scoreFeedback(score) {
    if (score <= Math.ceil(level / 5)) {
        return "Excellent!";
    } else if (score <= Math.ceil(level / 2)) {
        return "Good!";
    } else if (score <= level) {
        return "Okay!";
    } else {
        return "Better luck next time!";
    }
}

function play(){
    score = 0;
    startTime = new Date().getTime(); 
    playBtn.disabled = true;
    guessBtn.disabled = false;
    guess.disabled = false;
    giveUp.disabled = false;
    for(let i=0; i<levelArr.length; i++){
        if(levelArr[i].checked){
            level = Number(levelArr[i].value);
        }
        levelArr[i].disabled = true;
    }
    msg.textContent = "Guess a number from 1-"+level;
    answer = Math.floor(Math.random()*level)+1
    guess.placeholder = answer;
}

function makeGuess(){
    let userGuess = parseInt(guess.value);
    if (isNaN(userGuess) || userGuess < 1 || userGuess > level) {
        msg.textContent = "Enter a VALID # 1-"+level;
        return;
    }
    score++; 

    let diff = Math.abs(userGuess - answer); 

    if(userGuess === answer){
        let endTime = new Date().getTime();
        let roundTime = (endTime - startTime) / 1000; // seconds
        timeArr.push(roundTime);

        if(fastestTime === 0 || roundTime < fastestTime){
        fastestTime = roundTime;
        }

        let avgTime = timeArr.reduce((a,b)=>a+b,0) / timeArr.length;

        msg.textContent = "Correct! It took you " + score+ " tries in " + roundTime.toFixed(2)+" seconds " +scoreFeedback(score)+" Fastest: "+ fastestTime.toFixed(2)+ " Avg: "+ avgTime.toFixed(2);
        updateScore();
        reset();
    } else {
        
        let hint = "";
        if(diff >= Math.ceil(level * 0.5)) { 
            hint = "Cold";
        } else if(diff >= Math.ceil(level * 0.2)) {
            hint = "Warm";
        } else {
            hint = "Hot";
        }

        if(userGuess > answer){
            msg.textContent = "Too HIGH: " + hint;
        } else {
            msg.textContent = "Too LOW: " + hint;
        }
    }
}
function reset(){
    guess.disabled = true;
    guess.value = "";
    guess.placeholder="";
    playBtn.disabled = false;
    for(let i=0; i<levelArr.length;i++){
        levelArr[i].disabled = false;
    }

}
function updateScore(){
    scoreArr.push(score);
    scoreArr.sort((a,b)=>a-b); //sort by increasing order
    let lb = document.getElementsByName("leaderboard");
    wins.textContent = "Total wins: "+scoreArr.length;
    let sum=0;
    for(let i=0; i<scoreArr.length;i++){
        sum +=scoreArr[i];
        if(i<lb.length){
            lb[i].textContent = scoreArr[i];
        }
    }
    let avg = sum/scoreArr.length;
    avgScore.textContent = "Average Score: "+avg.toFixed(2);
}
function time(){
   let d = new Date();
    let monthNum = d.getMonth() + 1; // months are 0-indexed
    let day = d.getDate();
    let year = d.getFullYear();
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let seconds = d.getSeconds();

    let month = "";
    if (monthNum == 1){ 
        month = "January";
    }
    else if (monthNum == 2){ 
        month = "February";
    }
    else if (monthNum == 3){ 
        month = "March";
    }
    else if (monthNum == 4){ 
        month = "April";
    }
    else if (monthNum == 5){ 
        month = "May";
    }
    else if (monthNum == 6){ 
        month = "June";
    }
    else if (monthNum == 7){ 
        month = "July";
    }
    else if (monthNum == 8){ 
        month = "August";
    }
    else if (monthNum == 9){ 
        month = "September";
    }
    else if (monthNum == 10){ 
        month = "October";
    }
    else if (monthNum == 11){ 
        month = "November";
    }
    else if (monthNum == 12){ 
        month = "December";
    }
    let suffix = "th";
        if (day == 1 || day == 21 || day == 31){
             suffix = "st";
        }
        else if (day == 2 || day == 22){
             suffix = "nd";
        }
        else if (day == 3 || day == 23){
            suffix = "rd";
        }
    if (minutes < 10){
         minutes = "0" + minutes;
    }
    if (seconds < 10){
        seconds = "0" + seconds;
    }
    let fullDate = month + " " + day + suffix + ", " + year + " " + hours + ":" + minutes + ":" + seconds;
    return fullDate;
}

function pressGiveUp() {
    let endTime = new Date().getTime();
    let roundTime = (endTime - startTime) / 1000; 
    timeArr.push(roundTime);

    // update fastestTime
    if(fastestTime === 0 || roundTime < fastestTime){
        fastestTime = roundTime;
    }

    let avgTime = timeArr.reduce((a,b)=>a+b,0) / timeArr.length;

    score = Number(level);

    if (playerName) {
        msg.textContent = playerName + "you gave up! The correct answer was "+answer + scoreFeedback(score)+" Time: "+ roundTime.toFixed(2)+" Fastest: "+fastestTime.toFixed(2)+" Avg: "+avgTime.toFixed(2);
    } else {
        msg.textContent = "You gave up! The correct answer was " + answer+ scoreFeedback(score)+" Time: "+roundTime.toFixed(2)+" Fastest: "+fastestTime.toFixed(2)+" Avg: "+avgTime.toFixed(2);
    }
    updateScore();
    reset();
}


