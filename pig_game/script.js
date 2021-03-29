'use strict';

// Player sections
const playerSection1 = document.querySelector('.player--0');
const playerSection2 = document.querySelector('.player--1');

// First player
const defaultScore1 = document.getElementById('score--0').textContent;
const defaultCurrnetScore1 = document.getElementById('current--0').textContent;
const defaultPlayerName1 = document.getElementById('name--0').textContent;
let playerName1 = document.getElementById('name--0');
let score1 = document.getElementById('score--0');
let currentScore1 = document.getElementById('current--0');

// Second player
const defaultScore2 = document.getElementById('score--1').textContent;
const defaultCurrnetScore2 = document.getElementById('current--1').textContent;
const defaultPlayerName2 = document.getElementById('name--1').textContent;
let playerName2 = document.getElementById('name--1');
let score2 = document.getElementById('score--1');
let currentScore2 = document.getElementById('current--1');

// Buttons
const btnNewGame = document.querySelector('.btn--new');
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Dice image
const diceImage = document.querySelector('.dice');
const defaultDiceImageUri = diceImage.src;

// Other
const winningScore = 100;
let currentDiceNumber = 5; // default - 5 dots
let newDiceNumber = 0;

/* ASSIGN EVENT HANDLERS */
btnRollDice.addEventListener('click', RollDice);
btnNewGame.addEventListener('click', NewGame);
btnHold.addEventListener('click', Hold);

/* EVENT HANDLERS */
function Hold () {
    if (FirstPlayerIsActive()) {
        score1.textContent = Number(score1.textContent) + Number(currentScore1.textContent);
        if (score1.textContent >= winningScore) {
            playerName1.textContent = 'You win!';
            DeactivateRollHoldButtons();
        } 
        SetActivePlayer(2);
    } else if (SecondPlayerIsActive()) {
        score2.textContent = Number(score2.textContent) + Number(currentScore2.textContent);
        if (score2.textContent >= winningScore) {
            playerName2.textContent = 'You win!';
            DeactivateRollHoldButtons();
        } 
        SetActivePlayer(1);
    }
    HideDiceImage();
}

function NewGame() {
    ActivateRollHoldButonns();
    SetActivePlayer(1);
    // zero out player names
    playerName1.textContent = defaultPlayerName1;
    playerName2.textContent = defaultPlayerName2;
    // zero out first player's scores
    score1.textContent = defaultScore1;
    currentScore1.textContent = defaultCurrnetScore1;
    // zero out second player's scores
    score2.textContent = defaultScore2;
    currentScore2.textContent = defaultCurrnetScore2;
    // zero out and hide dice image
    diceImage.src = defaultDiceImageUri;
    HideDiceImage();
}

function RollDice() {
    ShowDiceImage();
    SetNewDiceNumber();
    if (FirstPlayerIsActive()) {
        if (currentDiceNumber === 1) {
            SetActivePlayer(2);
        } else {
            currentScore1.textContent = Number(currentScore1.textContent) + newDiceNumber;
        }
    } else if (SecondPlayerIsActive()) {
        if (currentDiceNumber === 1) {
            SetActivePlayer(1);
        } else {
            currentScore2.textContent = Number(currentScore2.textContent) + newDiceNumber;
        }
    }
}

/* FUNCTIONS */
function DeactivateRollHoldButtons() {
    DisableButton('.btn--roll');
    DisableButton('.btn--hold');
}

function ActivateRollHoldButonns() {
    EnableButton('.btn--roll');
    EnableButton('.btn--hold');
}

function DisableButton(buttonClass) {
    document.querySelector(buttonClass).setAttribute('disabled', 'disabled');
}
  
function EnableButton(buttonClass) {
    document.querySelector(buttonClass).removeAttribute('disabled', 'disabled');
}

function SetActivePlayer(playerNumber) {
    if (playerNumber === 1)
    {
        ClassListRemove(playerSection2, 'player--active');
        ClassListAdd(playerSection1, 'player--active');
        currentScore2.textContent = defaultCurrnetScore2;
    } else {
        ClassListRemove(playerSection1, 'player--active');
        ClassListAdd(playerSection2, 'player--active');
        currentScore1.textContent = defaultCurrnetScore1;
    }
}

function FirstPlayerIsActive() {
    return playerSection1.classList.contains('player--active');
}

function SecondPlayerIsActive() {
    return playerSection2.classList.contains('player--active');
}

function SetNewDiceNumber() {
    newDiceNumber = GetRandomDiceNumber();
    currentDiceNumber = newDiceNumber;
    SetDiceImageUri(newDiceNumber);
}

function ShowDiceImage() {
    if (diceImage.classList.contains('hidden')) {
        ClassListRemove(diceImage, 'hidden');
    }
}

function HideDiceImage() {
    if (!diceImage.classList.contains('hidden')) {
        ClassListAdd(diceImage, 'hidden');
    }
}

function SetDiceImageUri (diceImageNumber) {
    diceImage.src = defaultDiceImageUri;
    diceImage.src = diceImage.src.replace('dice-5', `dice-${diceImageNumber}`);
}

function GetRandomDiceNumber() {
    return Math.trunc(Math.random() * 6 + 1);
}

function ClassListRemove(htmlElement, targetClassOrClasses) {
    htmlElement.classList.remove(targetClassOrClasses);
}

function ClassListAdd(htmlElement, targetClassOrClasses) {
    htmlElement.classList.add(targetClassOrClasses);
}