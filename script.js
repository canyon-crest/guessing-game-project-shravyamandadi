// global variables
let level, answer, score, playerName;
const levelArr = document.getElementsByClassName("level");
const scoreArr = [];
const guess = document.getElementById("guess");
const playBtn = document.getElementById("playBtn");
const guessBtn = document.getElementById("guessBtn");
const giveUp = document.getElementById("giveUp");
const msg = document.getElementById("msg");
const wins = document.getElementById("wins");
const avgScore = document.getElementById("avgScore");


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



function play(){
    score = 0;
    playBtn.disabled = true;
    guessBtn.disabled = false;
    guess.disabled = false;
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
    score++; //valid guess add 1 to score
    if(userGuess>answer){
        msg.textContent = "Too HIGH";
    }
    else if(userGuess<answer){
        msg.textContent = "Too LOW";
    }
    else{
        msg.textContent = "Correct! It took you" + score + "tries. Press play to play again";
        updateScore();
        reset();
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
  score = Number(level);

  if (playerName) {
    msg.textContent =playerName+"you gave up! The correct answer was" +answer;
  } else {
    msg.textContent = "You gave up! The correct answer was" + answer;
  }
  updateScore();
  reset();
}


