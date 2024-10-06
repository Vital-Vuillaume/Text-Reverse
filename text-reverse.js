//------Https------\\

if (window.location.protocol != "https:") {
  window.location.protocol="https:";
}

const block = document.querySelector(".block");
const text = document.querySelector(".text");
const input = document.querySelector(".input");
const btn = document.getElementById("btnValider");
const answer = document.querySelector(".answer");
const lost = document.querySelector(".lost");
const scoreTxt = document.querySelector(".score");
const timerTxt = document.querySelector(".timer");
const scoreBestTxt = document.querySelector(".scoreBest");
const popup = document.querySelector(".popup");
const popupBtn = document.getElementById("btnOk");

const wordArray = words.trim().split('\n');

let score = 0;
let scoreBest = localStorage.getItem("scoreBest") ? parseInt(localStorage.getItem("scoreBest")) : 0;
let word;
let timer;
let countdown;
const delay = 10000;

scoreBestTxt.textContent = "Meilleur score: " + scoreBest;

function newWord() {
  const rdmWord = Math.floor(Math.random() * wordArray.length);
  word = wordArray[rdmWord];
  let wordReverse = reverseWord(word);
  text.textContent = wordReverse;

  clearTimeout(timer);
  clearInterval(countdown);

  let timeRemaining = delay / 1000;
  timerTxt.textContent = "Temps restant: " + timeRemaining;
  
  countdown = setInterval(() => {
    timeRemaining--;
    timerTxt.textContent = "Temps restant: " + timeRemaining;

    if (timeRemaining <= 0) {
      clearInterval(countdown);
        if (score > 0) {
          score--;
        }
        scoreTxt.textContent = "Score: " + score;
        text.textContent = word;
        input.value = "";
        answer.style.display = "none";
        lost.style.display = "block";
        setTimeout(() => {
          newWord();
          answer.style.display = "block";
          lost.style.display = "none";
        }, 3000);
    }
  }, 1000);
}

popupBtn.addEventListener("click", function() {
  popup.style.display = "none";
  block.style.filter = "blur(0px)";
  newWord();
});

function reverseWord(word) {
  let array = word.split('');

  do {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  } while (array.join('') === word);

  return array.join('');
}

function correctWord() {
  if (input.value.toLowerCase() === word) {
    score++;
    scoreTxt.textContent = "Score: " + score;
    input.value = "";
    if (score > scoreBest) {
      scoreBest = score;
      scoreBestTxt.textContent = "Meilleur score: " + scoreBest;
      localStorage.setItem("scoreBest", scoreBest);
    }
    newWord();
  }
}

btn.addEventListener("click", function() {
  correctWord();
});

input.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    correctWord();
  }
});