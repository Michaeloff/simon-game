const pads = document.querySelectorAll('.pad');

let sequence = [];
let userSequence = [];
let currentRound = 0;
let gameActive = false;

function startGame() {
  document.getElementById('gameStatus').textContent = 'Game On!';
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
  gameActive = false;

  const interval = setInterval(() => {
    const padIndex = sequence[index];
    flashPad(pads[padIndex], padIndex);
    index++;

    if (index >= sequence.length) {
      clearInterval(interval);
      gameActive = true;
    }
  }, 1000);
}

function flashPad(pad, padIndex) {
  pad.style.opacity = 0.5;
  playSound(padIndex);
  setTimeout(() => {
    pad.style.opacity = 1;
  }, 500);
}

pads.forEach((pad, index) => {
  pad.addEventListener('click', () => {
    if (!gameActive) return;
    userSequence.push(index);
    flashPad(pad, index);

    if (userSequence[userSequence.length - 1] !== sequence[userSequence.length - 1]) {
      endGame(false);
    } else if (userSequence.length === sequence.length) {
      if (currentRound === 5) {
        endGame(true);  // If 5 rounds are completed, player wins
      } else {
        setTimeout(nextRound, 1000);  // Move to the next round after 1 second
      }
    }
  });
});

function endGame(win) {
  gameActive = false;
  if (win) {
    document.getElementById('gameStatus').textContent = `You won! Completed ${currentRound} rounds.`;
  } else {
    document.getElementById('gameStatus').textContent = `Game Over! You made a mistake. You reached round ${currentRound}.`;
  }
  document.getElementById('roundCounter').textContent = `Round: ${currentRound}`;
}
