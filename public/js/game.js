import { playSound } from './sounds.js';

const pads = document.querySelectorAll('.pad');

let sequence = [];
let userSequence = [];
let currentRound = 0;
let isPlayerTurn = false;

document.getElementById('goButton').addEventListener('click', startGame);

function startGame() {
  document.getElementById('statusMessage').textContent = 'Game On!';
  //document.getElementById('goButton').style.display = 'none'; // Hide button
  document.getElementById('goButton').disabled = true; // Disable button
  currentRound = 0;
  sequence = [];
  nextRound();
}

function nextRound() {
  currentRound++;
  document.getElementById('roundCounter').textContent = `Round: ${currentRound}`;
  userSequence = [];
  
  // Add a new random pad to the sequence for this round, building on the previous sequence
  const randomPad = Math.floor(Math.random() * pads.length);
  sequence.push(randomPad);

  playSequence();
}

function playSequence() {
  let index = 0;
  isPlayerTurn = false;

  const interval = setInterval(() => {
    const padIndex = sequence[index];
    flashPad(pads[padIndex], padIndex);
    index++;

    if (index >= sequence.length) {
      clearInterval(interval);
      isPlayerTurn = true;
    }
  }, 600);
}

function flashPad(pad, padIndex) {
  pad.style.opacity = 1;
  pad.style.filter = "brightness(1.7)"; // Makes the pad brighter
  playSound(padIndex);
  setTimeout(() => {
    pad.style.opacity = 0.7;
    pad.style.filter = "brightness(1)"; // Reset brightness
  }, 200);
}

pads.forEach((pad, index) => {
  pad.addEventListener('click', () => {
    if (!isPlayerTurn) return;

    isPlayerTurn = false; // Prevent further clicks while flashing
    userSequence.push(index);
    flashPad(pad, index);

    setTimeout(() => {
      // After flash finishes
      if (userSequence[userSequence.length - 1] !== sequence[userSequence.length - 1]) {
        endGame(false);
      } else if (userSequence.length === sequence.length) {
        if (currentRound === 100) {
          endGame(true);
        } else {
          setTimeout(nextRound, 500);
        }
      } else {
        isPlayerTurn = true; // Allow next input
      }
    }, 300); // Slightly longer than flash duration (200ms)
  });
});

function endGame(win) {
  isPlayerTurn = false;
  //document.getElementById('goButton').style.display = 'inline-block'; // Show button
  document.getElementById('goButton').disabled = false; // Re-enable button

  if (win) {
    document.getElementById('statusMessage').textContent = `You won! Completed ${currentRound} rounds.`;
  } else {
    document.getElementById('statusMessage').textContent = `Game Over! You reached round ${currentRound}.`;
  }
  document.getElementById('roundCounter').textContent = `Round: ${currentRound}`;
}
