'use strict';

const secretNumberUpperLimit = 10;
const defaultScore = document.querySelector('.score').textContent;
const defaultHighscore = document.querySelector('.highscore').textContent;
const welcomeMessage = document.querySelector('.message').textContent;
const defaultSecretNumberForShow = document.querySelector('.number').textContent;

let secretNumber = GetSecretNumber(secretNumberUpperLimit);
let score = defaultScore;
let highscore = defaultHighscore;

document.querySelector('.score').textContent = score;
document.querySelector('.check').addEventListener('click', CheckGuessNumber);
document.querySelector('.again').addEventListener('click', TryAgain);

function CheckGuessNumber() {
  const guessNumber = Number(document.querySelector('.guess').value);
  if (GuessNumberIsValid(guessNumber)) {
    if (score > 0) {
      if (guessNumber === secretNumber) {
        SetMessage('YOU WIN!');
        SetHighscore();
      } else if (guessNumber > secretNumber) {
        SetMessage('Too high!');
        SetScore();
      } else {
        SetMessage('Too low!');
        SetScore();
      }
    } else {
      SetMessage('YOU LOST! Try again.');
      DisableButton('btCheck');
      ShowSecretNumber();
    }
  } else {
    SetMessage('Invalid input!');
  }
}

function TryAgain() {
  secretNumber = GetSecretNumber(secretNumberUpperLimit);
  ResetPage();
}

function GuessNumberIsValid(guessNumber) {
  if (guessNumber > 0 && guessNumber <= secretNumberUpperLimit) {
    return true;
  } else {
    return false;
  }
}

function GetSecretNumber(upperLimit) {
  return Math.trunc(Math.random() * upperLimit) + 1;
}

function DisableButton(buttonId) {
  document.getElementById(buttonId).setAttribute('disabled', 'disabled');
}

function EnableButton(buttonId) {
  document.getElementById(buttonId).removeAttribute('disabled', 'disabled');
}

function ResetPage() {
  score = defaultScore;
  highscore = defaultHighscore;

  document.querySelector('.number').textContent = defaultSecretNumberForShow;
  document.querySelector('.score').textContent = defaultScore;
  document.querySelector('.message').textContent = welcomeMessage;
  document.querySelector('.guess').value = '';

  EnableButton('btCheck');
}

function ShowSecretNumber() {
  document.querySelector('.number').textContent = secretNumber;
}

function SetMessage(messageText) {
  document.querySelector('.message').textContent = messageText;
}

function SetHighscore() {
  if (score > highscore) {
    highscore = score;
    document.querySelector('.highscore').textContent = highscore;
    ShowSecretNumber();
    DisableButton('btCheck');
  } 
}

function SetScore() {
  score--;
  document.querySelector('.score').textContent = score;
}
